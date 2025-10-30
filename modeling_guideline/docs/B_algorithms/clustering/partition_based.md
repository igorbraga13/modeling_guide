# Partition-Based Clustering

Essência: divide os dados em k grupos distintos, buscando minimizar a distância entre pontos e seus centróides.

| Algorithm                                                                | Description                                                       | Notes                                           |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------------- |
| **K-Means**                                                              | Minimizes within-cluster variance; assumes spherical clusters.    | Fast and scalable; sensitive to initialization. |
| **K-Medoids (PAM)**                                                      | Uses actual data points (medoids) as centers; robust to outliers. | Slower but more stable than K-Means.            |
| **CLARA (Clustering Large Applications)**                                | Approximation of K-Medoids for large datasets.                    | Scalable version of PAM.                        |
| **CLARANS (Clustering Large Applications based upon RANdomized Search)** | Hybrid of K-Medoids and randomized search.                        | Handles larger datasets efficiently.            |
| **Mini-Batch K-Means**                                                   | Processes mini-batches to accelerate convergence on large data.   | Used in online/streaming clustering.            |

🧠 Common use cases: customer segmentation, image quantization, vector embeddings, anomaly pre-grouping.