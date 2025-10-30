| Category                  | Algorithms                                                               | Description                                                                               | Typical Use Cases                                                              |
| ------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Partition-Based**       | **K-Means**, **K-Medoids (PAM)**                                         | Split data into *k* clusters minimizing distance to cluster centers (mean or medoid).     | Customer segmentation, document clustering, anomaly pre-grouping.              |
| **Hierarchical**          | **Agglomerative**, **Divisive**, **BIRCH**                               | Create a tree-like (dendrogram) structure of nested clusters. No need to predefine *k*.   | Taxonomies, hierarchical segmentation, gene expression data.                   |
| **Density-Based**         | **DBSCAN**, **OPTICS**, **HDBSCAN**                                      | Detect dense regions separated by sparse areas — ideal for irregular shapes and noise.    | Anomaly detection, spatial/geolocation data.                                   |
| **Model-Based**           | **Gaussian Mixture Models (GMM)**, **Dirichlet Process Mixtures (DPMM)** | Assume data originates from a mixture of probabilistic distributions.                     | Soft clustering, pattern discovery, topic modeling.                            |
| **Graph/Prototype-Based** | **Spectral Clustering**, **Louvain**, **Self-Organizing Maps (SOM)**     | Use graph connectivity or neural prototypes to cluster data by relationships or topology. | Community detection, network analysis, visualization of high-dimensional data. |

Características:

✅ Simples, interpretável e visualmente intuitivo.

⚠️ Alta variância — uma pequena mudança nos dados pode alterar a estrutura inteira.

🧠 Servem como “modelos base” para métodos mais sofisticados ([ensemble](ensemble_methods.md)).

✅ Simplified Summary

| Family                    | Representative Algorithms | Key Feature                          |
| ------------------------- | ------------------------- | ------------------------------------ |
| **Partition-Based**       | K-Means, K-Medoids        | Centroid-based, simple and scalable  |
| **Hierarchical**          | Agglomerative, Divisive   | Nested clusters (dendrograms)        |
| **Density-Based**         | DBSCAN, OPTICS, HDBSCAN   | Arbitrary shapes and noise tolerance |
| **Model-Based**           | GMM, DPMM                 | Probabilistic / soft clustering      |
| **Graph/Prototype-Based** | Spectral, Louvain, SOM    | Relationship or topology-based       |


| Category                    | Representative Algorithms            | Core Idea                                           |
| --------------------------- | ------------------------------------ | --------------------------------------------------- |
| **Partition-Based**         | K-Means, K-Medoids, CLARANS          | Assigns points to *k* centroids minimizing distance |
| **Hierarchical**            | Agglomerative, Divisive, BIRCH       | Builds a tree of clusters (dendrogram)              |
| **Density-Based**           | DBSCAN, OPTICS, HDBSCAN              | Finds dense areas and identifies noise              |
| **Model-Based**             | GMM, DPMM, Mean-Shift, Fuzzy C-Means | Probabilistic or soft membership clustering         |
| **Graph / Prototype-Based** | Spectral, Louvain, SOM, GNG          | Clusters via graph structure or neural competition  |


⚙️ Key Notes

K-Means → simplest, scalable, but assumes spherical clusters.

Hierarchical → flexible, interpretable dendrograms, but not scalable.

DBSCAN/HDBSCAN → handle noise and arbitrary shapes (no need for k).

GMM → probabilistic, soft membership (points can belong to multiple clusters).

Spectral / SOM → leverage structure or topology for complex data spaces.