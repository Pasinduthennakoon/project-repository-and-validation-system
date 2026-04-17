from keybert import KeyBERT
from collections import defaultdict
import re

# Load model once (important for performance)
kw_model = KeyBERT("distilbert-base-nli-mean-tokens")

# ✅ Clean + fixed TECH_MAP
TECH_MAP = {
    "machine learning": "ML",
    "ml": "ML",
    
    "artificial intelligence": "AI",
    "ai": "AI",
    
    "deep learning": "DL",
    "neural network": "DL",
    "cnn": "DL",
    "rnn": "DL",
    "lstm": "DL",
    "tensorflow": "DL",
    "pytorch": "DL",
    "keras": "DL",
    
    "nlp": "NLP",
    "natural language processing": "NLP",
    
    "computer vision": "Computer Vision",
    "opencv": "Computer Vision",
    "yolo": "Computer Vision",

    "javascript": "JavaScript",
    "react": "JavaScript",
    "react js": "JavaScript",
    "reactjs": "JavaScript",
    "node": "JavaScript",
    "node js": "JavaScript",
    "nodejs": "JavaScript",

    "python": "Python",
    "fastapi": "Python",
    "flask": "Python",
    "django": "Python",
    
    ".net": "C#",
    "dotnet": "C#",

    "spring boot": "Java",
    "java": "Java",

    "cybersecurity": "Cybersecurity",
    "blockchain": "Blockchain",
    "iot": "IoT",

    "web": "Web Development",
    "frontend": "Web Development",
    
    "backend": "Server Development",
    "server": "Server Development",
    "cloud": "Server Development",
    
    "mobile": "Mobile Development",
    "pc": "Pc Application Development",
}

# Allowed tags (STRICT CONTROL)
ALLOWED_TAGS = set(TECH_MAP.values())


# ✅ Normalize text
def normalize(text: str) -> str:
    text = text.lower()
    text = text.replace(".js", " js")
    text = re.sub(r"[^\w\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


# ✅ Token-safe matching (prevents "java" in "javascript")
def contains_phrase(text: str, phrase: str) -> bool:
    pattern = r"\b" + re.escape(phrase) + r"\b"
    return re.search(pattern, text) is not None


# ✅ Rule-based detection
def detect_technologies(text: str):
    normalized_text = normalize(text)
    tag_scores = defaultdict(float)

    for key, value in TECH_MAP.items():
        if contains_phrase(normalized_text, key):
            tag_scores[value] += 1.0

    return tag_scores


# ✅ MAIN FUNCTION (STRICT)
def generate_tags_logic(abstract):
    text = abstract if isinstance(abstract, str) else abstract.text

    # 🔹 Step 1: Extract keywords
    keywords = kw_model.extract_keywords(
        text,
        keyphrase_ngram_range=(1, 2),
        stop_words="english",
        top_n=10,
        use_mmr=True,
        diversity=0.7
    )

    tag_scores = defaultdict(float)

    # 🔹 Step 2: Map ONLY to TECH_MAP
    for phrase, score in keywords:
        phrase_norm = normalize(phrase)

        for key, value in TECH_MAP.items():
            if contains_phrase(phrase_norm, key):
                tag_scores[value] = max(tag_scores[value], score)

    # 🔹 Step 3: Strong rule-based detection
    detected_tech = detect_technologies(text)

    for tech, score in detected_tech.items():
        tag_scores[tech] = max(tag_scores[tech], score + 0.5)

    # 🔹 Step 4: STRICT FILTER + SORT
    sorted_tags = sorted(
        [(tag, score) for tag, score in tag_scores.items() if tag in ALLOWED_TAGS],
        key=lambda x: x[1],
        reverse=True
    )

    # 🔹 Step 5: Top 5 tags only
    final_tags = [tag for tag, _ in sorted_tags[:5]]

    return {"tags": final_tags}