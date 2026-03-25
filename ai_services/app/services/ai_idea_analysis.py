import re
from sklearn.feature_extraction.text import TfidfVectorizer

# -----------------------------
# Preprocessing
# -----------------------------
STOPWORDS = {"system","project","application","based","using"}

def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    return text

# -----------------------------
# Trending Topics
# -----------------------------
def get_trending_topics(titles):
    if not titles:
        return []

    vectorizer = TfidfVectorizer(
        stop_words='english',
        ngram_range=(2,2),  # bigrams
        max_features=10
    )
    X = vectorizer.fit_transform(titles)
    features = vectorizer.get_feature_names_out()

    filtered = [f for f in features if not f.startswith("ai ")]
    return filtered[:5]

