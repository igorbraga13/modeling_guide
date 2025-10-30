# Graph / Prototype-Based Clustering

Essência: usa relações (arestas) ou representações prototípicas (neuronais) para formar clusters.
Inclui tanto métodos baseados em grafos quanto neurais auto-organizáveis.

| Algorithm                                 | Description                                                                                         | Notes                                          |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Spectral Clustering**                   | Uses graph Laplacian eigenvectors to project data into a lower-dimensional space before clustering. | Excellent for non-convex structures.           |
| **Louvain / Leiden**                      | Optimizes modularity to detect communities in large networks.                                       | Common in social network analysis.             |
| **Markov Clustering (MCL)**               | Uses random walks on a graph to identify cluster boundaries.                                        | Effective in bioinformatics and networks.      |
| **Self-Organizing Map (SOM)**             | Neural grid that organizes data topologically via competition.                                      | Visual and interpretable neural clustering.    |
| **Neural Gas / Growing Neural Gas (GNG)** | Expands SOM dynamically to capture data distribution.                                               | Adaptive neural clustering for streaming data. |

🧠 Common use cases: community detection, topology visualization, social networks, embedding interpretation.