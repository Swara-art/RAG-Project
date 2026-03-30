import faiss
import numpy as np

dimension = 384 
index = faiss.IndexFlatL2(dimension)

chunk_store = []

def add_embeddings(embeddings, chunks):
    global index, chunk_store

    vectors = np.array(embeddings).astype("float32")
    index.add(vectors)

    chunk_store.extend(chunks)


def search(query_embedding, k=5):
    vector = np.array([query_embedding]).astype("float32")
    distances, indices = index.search(vector, k)

    results = []
    for idx in indices[0]:
        if idx < len(chunk_store):
            results.append(chunk_store[idx])

    return results