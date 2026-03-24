from typing import List
from collections import Counter
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

from app.models.response_models import GapResponse

def analyze_projects(projects: List[GapResponse]):

    all_tags = []
    documents = []

    for p in projects:
        if p.tags:
            tags_joined = " ".join(p.tags)
            documents.append(tags_joined)
            all_tags.extend([t.lower() for t in p.tags])

    # -------- 1. Frequency Analysis --------
    tag_counts = Counter(all_tags)

    sorted_tags = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)

    trending = [t[0] for t in sorted_tags[:3]]
    underrepresented = [t[0] for t in sorted_tags[-3:]]

    # -------- 2. TF-IDF (importance) --------
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(documents)

    # -------- 3. Clustering --------
    if len(documents) >= 2:
        kmeans = KMeans(n_clusters=min(3, len(documents)), random_state=42)
        kmeans.fit(X)

        terms = vectorizer.get_feature_names_out()

        suggestions = []

        for i in range(len(kmeans.cluster_centers_)):
            center = kmeans.cluster_centers_[i]
            top_indices = center.argsort()[-3:][::-1]

            for idx in top_indices:
                suggestions.append(terms[idx])

        suggestions = list(set(suggestions))
    else:
        suggestions = trending

    return GapResponse(
        trending=trending,
        underrepresented=underrepresented,
        suggestions=suggestions[:3]
    )