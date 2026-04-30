from dotenv import load_dotenv
import os
from langchain_mistralai import ChatMistralAI

from app.db.init_db import init_db

load_dotenv()

from fastapi import FastAPI
from app.routes import document_routes
from app.routes import chat_routes
from app.routes import auth_routes
from fastapi.middleware.cors import CORSMiddleware


api_key = os.getenv("MISTRAL_API_KEY")
model = ChatMistralAI(model="mistral-small", temperature=0.5, max_tokens=1000, mistral_api_key=api_key)
print("API KEY:", api_key)

app = FastAPI(
    title="CourseMate AI",
    description="AI-powered study assistant using RAG",
    version="1.0.0"
)

app.include_router(auth_routes.router)
app.include_router(document_routes.router, prefix="/documents", tags=["Documents"])
app.include_router(chat_routes.router, prefix="/chat", tags=["Chat"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Chat-Session-Id"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def root():
    return {"message": "CourseMate AI is running 🚀"}

@app.get("/test-llm")
def test_llm():
    result = model.invoke("What is the capital of France?")
    return {"response": result.content}



