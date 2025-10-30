# Hierarchical Clustering

Essência: cria uma árvore (dendrograma) de relações entre observações, que pode ser cortada em diferentes níveis para formar clusters.

| Algorithm                                                                | Description                                                                    | Notes                                     |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------- |
| **Agglomerative Hierarchical Clustering (HAC)**                          | Starts with each point as a cluster, merges iteratively based on distance.     | Most common hierarchical method.          |
| **Divisive (DIANA)**                                                     | Starts with one cluster and recursively splits into smaller ones.              | Top-down counterpart to HAC.              |
| **BIRCH (Balanced Iterative Reducing and Clustering using Hierarchies)** | Incrementally builds a CF tree to handle large datasets.                       | Efficient and scalable.                   |
| **CURE (Clustering Using Representatives)**                              | Uses multiple representative points per cluster; handles non-spherical shapes. | Good for uneven cluster sizes.            |
| **CHAMELEON**                                                            | Adapts merging criterion based on inter/intra-connectivity.                    | Effective for complex cluster structures. |

🧠 Common use cases: biological data (gene expression), document taxonomy, exploratory data analysis.