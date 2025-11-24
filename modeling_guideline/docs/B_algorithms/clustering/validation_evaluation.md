
## Métricas Internas
Plotamos o elbow e silhueta juntos em 1 só gráfico para melhorar análise

### Elbow Method
Inércia (K-Means): soma de distâncias ao centróide; usar para “cotovelo”; não compara entre algoritmos.

### Silhouette Method
Mede separação e coesão; varia de -1 a 1; bom para formas globulares. Útil para escolher k.

### Davies-Bouldin (DB)
Média de similaridade entre clusters; menor é melhor.

### Calinski-Harabasz Indice (CH)
Razão entre dispersão inter/intra clusters; maior é melhor; eficiente em alta dimensionalidade moderada.

## Métricas Externas

### Adjusted Rand Index (ARI)
Corrige ao acaso; [−1,1], maior melhor.

### Normalized Mutual Information (NMI)
[0,1], maior melhor; insensível a permutação de rótulos.

### Fowlkes–Mallows
Média geométrica de precisão e revocação entre partições.

## Estabilidade e Robustez
Teste estabilidade via bootstrap ou subamostragem; use ARI/NMI entre runs para avaliar robustez.

Jaccard médio entre clusters correspondentes; variação de informação.

Sensibilidade a inicialização (K-Means) e a perturbações em dados/hiperparâmetros.

## Seleção k (Hiperparâmetros)
Varredura de k e curvas: Silhouette, CH (maximizar) e DB (minimizar).
“Cotovelo” na inércia: usar método Kneedle para automatizar.
Gap Statistic: compara Wk com referência nula.
DBSCAN/HDBSCAN: usar Silhouette em pontos não-ruído, proporção de ruído, número de clusters estáveis; variar eps/min_samples.
Hierárquico: cortar dendrograma otimizando Silhouette/CH por corte.

## Boas Práticas
K-Means: padronizar features; usar distância euclidiana; avaliar Silhouette/CH e inércia; múltiplas inicializações.
DBSCAN: escalar dados; ajustar eps via gráfico k-dist; avaliar Silhouette sem ruído e estabilidade; considerar densidades distintas.
Hierárquico: escolher linkage coerente (ward ~ euclidiana); usar inconsistency/altura do corte + métricas internas.

## Pre-processamento
Escala das variáveis afeta distâncias; padronize quando apropriado.
Alta dimensionalidade: considere redução (PCA/UMAP) e avalie métricas em espaço reduzido e original.
Métrica de distância deve combinar com o algoritmo (ex.: K-Means → euclidiana).

## Exemplo

```python
# Seleção de k com métricas internas:
import numpy as np
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import silhouette_score, calinski_harabasz_score, davies_bouldin_score
from sklearn.preprocessing import StandardScaler

X = ...  # seu dataset (n_samples, n_features)
X = StandardScaler().fit_transform(X)

def eval_kmeans(X, k_range=range(2, 11), random_state=42):
    rows = []
    for k in k_range:
        km = KMeans(n_clusters=k, n_init='auto', random_state=random_state)
        labels = km.fit_predict(X)
        if len(set(labels)) < 2:
            continue
        sil = silhouette_score(X, labels)
        ch = calinski_harabasz_score(X, labels)
        db = davies_bouldin_score(X, labels)
        inertia = km.inertia_
        rows.append((k, sil, ch, db, inertia))
    return rows

results = eval_kmeans(X)
best_by_sil = max(results, key=lambda r: r[1])
best_by_ch = max(results, key=lambda r: r[2])
best_by_db = min(results, key=lambda r: r[3])
print("Best k by silhouette/CH/DB:", best_by_sil[0], best_by_ch[0], best_by_db[0])

# Grid leve para DBSCAN (ignora ruído para Silhouette):
def silhouette_ignoring_noise(X, labels):
    mask = labels != -1
    if mask.sum() < 2 or len(set(labels[mask])) < 2:
        return np.nan
    return silhouette_score(X[mask], labels[mask])

def eval_dbscan(X, eps_list, min_samples_list):
    rows = []
    for eps in eps_list:
        for ms in min_samples_list:
            dbs = DBSCAN(eps=eps, min_samples=ms).fit(X)
            labels = dbs.labels_
            n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
            noise_ratio = (labels == -1).mean()
            sil = silhouette_ignoring_noise(X, labels)
            rows.append((eps, ms, n_clusters, noise_ratio, sil))
    return rows

grid = eval_dbscan(X, eps_list=np.linspace(0.2, 2.0, 10), min_samples_list=[5, 10, 20])
grid_sorted = sorted([g for g in grid if not np.isnan(g[4])], key=lambda r: r[4], reverse=True)
print("Top DBSCAN configs by silhouette (non-noise):", grid_sorted[:5])
```

https://medium.com/@kalimarapeleteiro/m%C3%A9tricas-de-agrupamento-coeficiente-de-silhueta-%C3%ADndice-de-davies-bouldin-e-%C3%ADndice-de-9462b87ce676