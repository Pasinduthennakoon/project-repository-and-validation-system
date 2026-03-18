from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv(dotenv_path="app/.env")

print("Starting model load...")

# Load model (no HF token needed for this)
model = SentenceTransformer("all-MiniLM-L6-v2")

print("Model loaded successfully!")

# Encoding function
def encode(texts):
    if isinstance(texts, str):
        texts = [texts]

    embeddings = model.encode(
        texts,
        batch_size=32,
        normalize_embeddings=True,  # important for cosine similarity
        show_progress_bar=True
    )

    return embeddings