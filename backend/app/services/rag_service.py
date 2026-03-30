from app.services.embedding_service import get_embedding
from app.services.vector_store_service import search
from langchain_mistralai import ChatMistralAI
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")

model = ChatMistralAI(
    model="mistral-small",
    mistral_api_key=api_key
)

def ask_question(query: str):
    query_embedding = get_embedding(query)

    relevant_chunks = list(set(search(query_embedding, k=8)))
    

    context = "\n\n".join(relevant_chunks)

    prompt = f"""
You are an AI tutor that explains concepts clearly and beautifully.

FORMAT RULES (VERY IMPORTANT):
- Use clear section headings (##, ###)
- Use bullet points instead of long paragraphs
- Add spacing between sections
- Use emojis/icons to improve readability
- Highlight key terms using **bold**
- Keep sentences short and simple
- Avoid dense text blocks
- Use separators (---) between sections
- Structure answers for frontend display (like a blog/article)

CONTENT RULES:
- Explain in simple, student-friendly language
- Give structured breakdowns
- Include summary at the end

OUTPUT STYLE:
Make the answer visually clean, scannable, and pleasant to read.

Context:
{context}

Question:
{query}
"""

    response = model.invoke(prompt)

    return response.content