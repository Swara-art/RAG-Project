from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from fastapi import APIRouter, UploadFile, File, Depends
from app.db.session import get_db
from app.models.document import Document
from app.models.chunk import Chunk
from sqlalchemy.orm import Session

from app.services.embedding_service import get_embeddings
from app.services.vector_store_service import add_embeddings

import os

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("/test")
def test_docs():
    return {"status": "ok"}

@router.get("/")
def list_documents(db: Session = Depends(get_db)):
    documents = db.query(Document).order_by(Document.id.desc()).all()
    return [
        {
            "id": document.id,
            "filename": document.filename,
            "filepath": document.filepath,
        }
        for document in documents
    ]

@router.post("/upload")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_location = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    new_doc = Document(
        filename=file.filename,
        filepath=file_location
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)

    loader = PyMuPDFLoader(file_location)
    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=200
    )
    chunks = splitter.split_documents(documents)
    

    for chunk in chunks:
        db_chunk = Chunk(
            document_id=new_doc.id,
            content=chunk.page_content
        )
        db.add(db_chunk)
    
    chunk_texts = [chunk.page_content for chunk in chunks]
    embeddings = get_embeddings(chunk_texts)
    add_embeddings(embeddings, chunk_texts)

    db.commit()

    return {
        "message": "File uploaded and processed successfully",
        "document_id": new_doc.id,
        "filename": new_doc.filename,
        "filepath": new_doc.filepath,
        "chunks_created": len(chunks),
        "embeddings_added": len(embeddings)
    }
