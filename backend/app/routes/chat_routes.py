from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.chat import ChatMessage, ChatSession
from app.services.rag_service import ask_question, stream_answer

router = APIRouter()

import re
from datetime import datetime, timezone

def format_response(text: str) -> str:
    # Fix broken tables
    text = re.sub(r"\|\s*\n--\|", "", text)

    # Ensure proper spacing before headings
    text = re.sub(r"(## .+)", r"\n\n\1\n", text)

    # Fix bullet spacing
    text = re.sub(r"\n- ", "\n\n- ", text)

    # Fix numbered lists
    text = re.sub(r"\n\d+\.", lambda m: "\n\n" + m.group(0).strip(), text)

    # Clean separators
    text = text.replace("---", "\n\n---\n\n")

    # Remove garbage table lines
    text = re.sub(r"\|\s*\|\s*$", "", text, flags=re.MULTILINE)

    # Collapse excessive spacing
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()

@router.post("/ask")
def ask(query: str):
    formatted_query = format_response(query)
    answer = ask_question(formatted_query)
    formatted_answer = format_response(answer)
    return {"answer": formatted_answer}

@router.post("/ask/stream")
def ask_stream(query: str, session_id: int | None = None, db: Session = Depends(get_db)):
    formatted_query = format_response(query)
    chat_session = get_or_create_session(db, query, session_id)

    def response_generator():
        answer_parts = []
        for chunk in stream_answer(formatted_query):
            answer_parts.append(chunk)
            yield chunk

        save_chat_exchange(db, chat_session.id, query, "".join(answer_parts))

    headers = {"X-Chat-Session-Id": str(chat_session.id)}
    return StreamingResponse(response_generator(), media_type="text/plain", headers=headers)


@router.post("/sessions")
def create_session(query: str = "New chat", db: Session = Depends(get_db)):
    chat_session = get_or_create_session(db, query)
    return serialize_session(chat_session)


@router.get("/sessions")
def list_sessions(db: Session = Depends(get_db)):
    sessions = db.query(ChatSession).order_by(ChatSession.updated_at.desc(), ChatSession.id.desc()).all()
    return [serialize_session(session) for session in sessions]


@router.get("/sessions/{session_id}")
def get_session(session_id: int, db: Session = Depends(get_db)):
    chat_session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not chat_session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.id.asc())
        .all()
    )

    return {
        **serialize_session(chat_session),
        "messages": [
            {
                "id": message.id,
                "sender": message.sender,
                "text": message.content,
                "created_at": message.created_at,
            }
            for message in messages
        ],
    }


def get_or_create_session(db: Session, query: str, session_id: int | None = None):
    if session_id:
        chat_session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
        if not chat_session:
            raise HTTPException(status_code=404, detail="Chat session not found")
        return chat_session

    title = query.strip().replace("\n", " ")[:48] or "New chat"
    chat_session = ChatSession(title=title)
    db.add(chat_session)
    db.commit()
    db.refresh(chat_session)
    return chat_session


def save_chat_exchange(db: Session, session_id: int, query: str, answer: str):
    db.add(ChatMessage(session_id=session_id, sender="user", content=query))
    db.add(ChatMessage(session_id=session_id, sender="ai", content=format_response(answer)))

    chat_session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if chat_session:
        chat_session.updated_at = datetime.now(timezone.utc)

    db.commit()


def serialize_session(chat_session: ChatSession):
    return {
        "id": chat_session.id,
        "title": chat_session.title,
        "created_at": chat_session.created_at,
        "updated_at": chat_session.updated_at,
    }

