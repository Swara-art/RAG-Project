# 📚 CourseMate AI — RAG-Powered Study Assistant

> An AI-powered study assistant that lets students **chat with their study materials** — getting instant, accurate answers from lecture notes, textbooks, PDFs, and research papers using **Retrieval-Augmented Generation (RAG)**.

![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)
![Frontend](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=flat-square&logo=react)
![AI](https://img.shields.io/badge/AI-Generative%20AI%20%2B%20RAG-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Workflow](#-workflow)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development Plan](#-development-plan)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**CourseMate AI** is an intelligent, RAG-powered study companion built for modern students. It allows users to upload their study documents — lecture notes, textbooks, PDFs, research papers — and then have a natural language conversation with those materials.

Instead of manually scrolling through hundreds of pages, students simply **ask questions** and receive **accurate, context-grounded answers** extracted directly from their own documents — powered by a full **Retrieval-Augmented Generation (RAG) pipeline** backed by a **Generative AI** model.

---

## ❗ The Problem

Modern students face a common and frustrating challenge:

- 📂 They rely on **multiple sources** of study material — lecture notes, textbooks, PDFs, research papers, and slides
- 📜 These documents are often **long and dense**, making it time-consuming to locate specific information
- 🔍 **Manual searching** through hundreds of pages wastes valuable study time
- 🧠 Reading everything repeatedly is inefficient, especially during exam season

---

## ✅ The Solution

CourseMate AI allows students to **have a conversation with their study materials**.

- Upload your documents (PDFs) once
- The system processes, chunks, and indexes them automatically
- Ask any question in plain English
- Receive **accurate, context-aware answers** grounded in your own documents — not hallucinated from the internet

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 **PDF Upload & Management** | Upload, store, and manage multiple study documents |
| 🔪 **Intelligent Text Chunking** | Smart splitting of documents into overlapping, semantically meaningful chunks |
| 🧠 **Vector Embeddings** | Documents converted to vector representations for semantic search |
| 🗄️ **Vector Store** | Fast similarity-based retrieval of relevant document chunks |
| 💬 **Conversational Q&A** | Chat with your documents using natural language |
| 🎯 **Source-Grounded Answers** | Every answer is extracted from your uploaded documents — not made up |
| 🔐 **User Authentication** | Secure JWT-based login — each user's documents are private |
| 📁 **Per-User Document Isolation** | Each user only accesses their own uploaded documents |
| ⚡ **Fast RAG Pipeline** | End-to-end retrieval + generation in seconds |
| 🖥️ **React Frontend** | Clean, responsive chat interface built with React.js |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         CourseMate AI                            │
├──────────────────┬───────────────────────┬───────────────────────┤
│   Frontend       │    Backend (FastAPI)   │    AI / RAG Layer     │
│   (React.js)     │                       │                       │
│                  │  auth_routes.py        │  embedding_service.py │
│  Chat UI         │  document_routes.py   │  vector_store_service │
│  Document Upload │  chat_routes.py       │  chunking_service.py  │
│  Auth Pages      │                       │  rag_service.py       │
└──────┬───────────┴──────────┬────────────┴───────────┬───────────┘
       │                      │                        │
       ▼                      ▼                        ▼
  User Interacts        PostgreSQL DB            Vector Store
  via Browser           (Users, Docs,            (Embeddings +
                         Chunks)                  Similarity Search)
                                                      │
                                                      ▼
                                               Generative AI Model
                                               (Answer Generation)
```

---

## 🔄 Workflow

### Phase 1 — User Authentication

```
User Visits App (React Frontend)
          │
          ▼
Register / Login
(user_schema.py validates input)
          │
          ▼
auth_routes.py handles request
          │
          ▼
security.py verifies credentials
          │
          ▼
JWT Token issued → stored in browser
          │
          ▼
User gains access to their dashboard
```

---

### Phase 2 — Document Upload & Processing

```
User Uploads PDF (via React UI)
          │
          ▼
document_routes.py receives file
          │
          ▼
pdf_service.py
(Extracts raw text from PDF)
          │
          ▼
chunking_service.py
(Splits text into overlapping chunks
 of ~500 tokens with overlap)
          │
          ▼
embedding_service.py
(Converts each chunk into a
 vector embedding via AI model)
          │
          ▼
vector_store_service.py
(Stores vectors in Vector Store
 indexed by user + document)
          │
          ▼
Document metadata saved to DB
(document.py model → PostgreSQL)
Chunks saved to DB (chunk.py model)
          │
          ▼
Document ready for querying ✅
```

> **Why chunking?** LLMs have context window limits. Splitting into overlapping chunks ensures no information is lost and retrieval stays precise.

> **Why embeddings?** Vectors capture semantic meaning — so a question about "Newton's laws" can match a chunk that says "forces acting on objects" even without exact keyword overlap.

---

### Phase 3 — Chat & RAG Query Flow

```
User Types a Question (React Chat UI)
              │
              ▼
chat_routes.py receives query
(chat_schema.py validates input)
              │
              ▼
rag_service.py orchestrates RAG pipeline:
              │
    ┌─────────┴──────────┐
    ▼                    ▼
Embed the           Retrieve User's
Question            Document Context
(embedding_         (vector_store_
 service.py)         service.py)
    │                    │
    └─────────┬──────────┘
              ▼
   Similarity Search
   (Top-K most relevant chunks
    fetched from Vector Store)
              │
              ▼
   Context Assembly
   (Retrieved chunks combined
    into a structured prompt)
              │
              ▼
   Generative AI Model
   (Prompt = Context + Question)
   (Generates grounded answer)
              │
              ▼
   Answer returned to React Chat UI
   (Displayed with source reference)
```

---

### Complete End-to-End Flow

```
[User] ──► Register / Login
                │
                ▼ JWT Token
[User] ──► Upload PDF Document
                │
                ▼
         pdf_service.py extracts text
                │
                ▼
         chunking_service.py splits into chunks
                │
                ▼
         embedding_service.py embeds chunks
                │
                ▼
         vector_store_service.py stores vectors
                │
                ▼
         Chunks & metadata saved to PostgreSQL
                │
[User] ──► Ask a Question in Chat
                │
                ▼
         Question embedded → Similarity Search
                │
                ▼
         Top-K relevant chunks retrieved
                │
                ▼
         Prompt built: [Context] + [Question]
                │
                ▼
         Generative AI generates answer
                │
                ▼
[User] ◄── Answer displayed in Chat UI ✅
```

---

### Data Insertion Flow (`insert.py`)

```
insert.py (Utility Script)
      │
      ▼
Manually insert / seed documents
or test chunks into the DB
(Used for testing the pipeline
 without going through the UI)
      │
      ▼
init_db.py → initializes DB tables
base.py → SQLAlchemy declarative base
session.py → manages DB sessions
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js |
| **Backend** | Python — FastAPI (`main.py`) |
| **Database** | PostgreSQL (via SQLAlchemy ORM) |
| **AI / Generative AI** | Generative AI Model (LLM for answer generation) |
| **Embeddings** | AI Embedding Model (`embedding_service.py`) |
| **Vector Store** | Vector Store for similarity search (`vector_store_service.py`) |
| **PDF Parsing** | `pdf_service.py` — extracts text from uploaded PDFs |
| **Text Chunking** | `chunking_service.py` — intelligent overlapping chunking |
| **RAG Orchestration** | `rag_service.py` — ties retrieval + generation together |
| **Authentication** | JWT Tokens (`core/security.py`) |
| **Config & Env** | `core/config.py`, `.env` |
| **Version Control** | Git + GitHub |

---

## 📁 Project Structure

```
RAG-PROJECT/
│
├── .env                                  # Environment variables (API keys, DB URL)
├── requirements.txt                      # Python dependencies
│
├── frontend/                             # Frontend — React.js
│   └── (React app — components, pages,
│        chat UI, document upload, auth)
│
└── backend/                              # Backend — FastAPI
    ├── app/
    │   ├── main.py                       # FastAPI app entry point
    │   │
    │   ├── core/                         # Core Configuration
    │   │   ├── __init__.py
    │   │   ├── config.py                 # App settings, env variable loading
    │   │   └── security.py               # JWT token creation & verification
    │   │
    │   ├── db/                           # Database Layer
    │   │   ├── __init__.py
    │   │   ├── base.py                   # SQLAlchemy declarative base
    │   │   ├── init_db.py                # DB initialization / table creation
    │   │   └── session.py                # DB session management
    │   │
    │   ├── models/                       # SQLAlchemy ORM Models
    │   │   ├── __init__.py
    │   │   ├── chunk.py                  # Chunk model (stores text chunks + embeddings)
    │   │   ├── document.py               # Document model (metadata of uploaded PDFs)
    │   │   └── user.py                   # User model
    │   │
    │   ├── routes/                       # API Route Handlers
    │   │   ├── __init__.py
    │   │   ├── auth_routes.py            # /auth — register, login
    │   │   ├── chat_routes.py            # /chat — RAG query endpoint
    │   │   └── document_routes.py        # /documents — upload, list, delete
    │   │
    │   ├── schemas/                      # Pydantic Request/Response Schemas
    │   │   ├── __init__.py
    │   │   ├── chat_schema.py            # Chat query & response schema
    │   │   ├── document_schema.py        # Document upload & response schema
    │   │   └── user_schema.py            # User register & login schema
    │   │
    │   ├── services/                     # Business Logic & AI Services
    │   │   ├── __init__.py
    │   │   ├── chunking_service.py       # Text splitting with overlap
    │   │   ├── embedding_service.py      # Convert text → vector embeddings
    │   │   ├── pdf_service.py            # Extract text from uploaded PDFs
    │   │   ├── rag_service.py            # RAG pipeline orchestration
    │   │   └── vector_store_service.py   # Store & search vector embeddings
    │   │
    │   └── uploads/                      # Uploaded PDF files storage
    │       └── __init__.py
    │
    └── insert.py                         # Utility: seed / test data insertion
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL installed and running
- Generative AI API key (e.g., Google Gemini / OpenAI / Mistral)
- Git

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/rag-project.git
cd rag-project

# 2. Set up virtual environment
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Configure environment variables
cp .env.example .env
# Fill in your values (see below)

# 5. Initialize the database
cd backend
python -c "from app.db.init_db import init; init()"

# 6. Start the FastAPI server
uvicorn app.main:app --reload
```

**API Docs available at:** `http://localhost:8000/docs`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React dev server
npm start
```

**Frontend available at:** `http://localhost:3000`

### Environment Variables (`.env`)

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/ragproject_db

# JWT Authentication
SECRET_KEY=your_jwt_secret_key_here
JWT_ALGORITHM=HS256
JWT_EXPIRY_MINUTES=60

# Generative AI
GENERATIVE_AI_API_KEY=your_ai_api_key_here

# Embedding Model
EMBEDDING_MODEL=your_embedding_model_name

# Vector Store
VECTOR_STORE_PATH=./vector_store

# File Uploads
UPLOAD_DIR=./app/uploads
```

---

## 🗺️ Development Plan

### Phase 1 — Foundation ✅
- [x] Project structure setup (backend + frontend)
- [x] PostgreSQL DB models: `user.py`, `document.py`, `chunk.py`
- [x] DB initialization: `base.py`, `init_db.py`, `session.py`
- [x] Core config & JWT security: `config.py`, `security.py`

### Phase 2 — Authentication
- [x] User registration & login (`auth_routes.py`)
- [x] Pydantic schemas (`user_schema.py`)
- [ ] JWT token refresh
- [ ] Protected route middleware

### Phase 3 — Document Pipeline
- [x] PDF text extraction (`pdf_service.py`)
- [x] Text chunking with overlap (`chunking_service.py`)
- [x] Vector embedding generation (`embedding_service.py`)
- [x] Vector store integration (`vector_store_service.py`)
- [x] Document upload route (`document_routes.py`)
- [x] Document schema (`document_schema.py`)

### Phase 4 — RAG Chat
- [x] RAG service pipeline (`rag_service.py`)
- [x] Chat route (`chat_routes.py`)
- [x] Chat schema (`chat_schema.py`)
- [ ] Conversation history (multi-turn context)
- [ ] Source citation in responses

### Phase 5 — React Frontend
- [ ] Auth pages (Login / Register)
- [ ] Document upload page
- [ ] Chat interface with conversation history
- [ ] Document management (list / delete)
- [ ] Source reference display

### Phase 6 — Testing & Polish
- [ ] Unit tests for all services
- [ ] API integration tests
- [ ] Error handling & edge cases
- [ ] Loading states & UX improvements

### Phase 7 — Deployment
- [ ] Dockerize backend + frontend
- [ ] Deploy to cloud (AWS / GCP / Render)
- [ ] CI/CD pipeline setup

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "Add: your feature"`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

Please write tests for new features and follow the existing code conventions.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🧠 TL;DR

CourseMate AI is a full-stack RAG application offering:

- ✅ JWT-secured user authentication
- ✅ PDF upload, parsing, and intelligent chunking
- ✅ Vector embeddings + similarity search for semantic retrieval
- ✅ Full RAG pipeline — retrieve relevant context → generate grounded answers
- ✅ React.js chat interface for natural conversation with documents
- ✅ Per-user document isolation and privacy
- ✅ FastAPI backend + PostgreSQL database

> Built to make studying smarter, faster, and more effective for every student.

---

<p align="center">Built with ❤️ for students, by students.</p>
