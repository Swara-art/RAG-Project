from fastapi import APIRouter
from app.services.rag_service import ask_question

router = APIRouter()

import re

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


