from keybert import KeyBERT

kw_model = KeyBERT("distilbert-base-nli-mean-tokens")

TECH_MAP = {
    "machine learning": "ML",
    "ml": "ML",
    "artificial intelligence": "AI",
    "ai": "AI",
    "deep learning": "DL",
    "react": "React",
    "spring boot": "Spring Boot",
    "node": "Node.js",
    "node.js": "Node.js",
    "fastapi": "FastAPI",
    "tensorflow": "TensorFlow",
    "pytorch": "PyTorch",
    "python": "Python",
    "java": "Java",
    "mysql": "MySQL",
    "mongodb": "MongoDB",
    "firebase": "Firebase",
    "nlp": "NLP",
    "cybersecurity": "Cybersecurity",
    "blockchain": "Blockchain",
    "iot": "IOT",
    "web":"Web Development",
    "mobile":"Mobile Development",
    "pc application":"PC Application",
    "server":"Server Development",
    "data science":"Data Science",
    "computer vision":"Computer Vision",
    "cloud":"Cloud Computing"
}

def generate_tags(abstract):
    # Extract keywords with relevance scores
    keywords = kw_model.extract_keywords(
        abstract.text,
        keyphrase_ngram_range=(1, 2),
        stop_words="english",
        top_n=10,
        use_mmr=True,
        diversity=0.7
    )

    cleaned_tags = set()

    for word, score in keywords:
        word = word.lower()

        # Check if any known tech appears inside phrase
        for key in TECH_MAP:
            if key in word:
                cleaned_tags.add(TECH_MAP[key])

    # Convert to list and limit to 5
    final_tags = list(cleaned_tags)[:5]

    return {"tags": final_tags}