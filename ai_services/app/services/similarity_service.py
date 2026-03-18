from sklearn.metrics.pairwise import cosine_similarity

def compute_similarity(query_embedding, corpus_embeddings):
    return cosine_similarity(query_embedding, corpus_embeddings)[0]