# Model-Based Clustering

Essência: assume que os dados vêm de uma mistura de distribuições (geralmente gaussianas).
Os clusters são definidos probabilisticamente (soft assignment).

| Algorithm                                   | Description                                                                          | Notes                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| **Gaussian Mixture Models (GMM)**           | Uses Expectation-Maximization (EM) to fit a mixture of normal distributions.         | Probabilistic alternative to K-Means.                |
| **Dirichlet Process Mixture Model (DPMM)**  | Bayesian non-parametric version that infers the number of clusters automatically.    | Useful for unknown or dynamic *k*.                   |
| **Mean-Shift**                              | Moves cluster centers toward the densest region iteratively.                         | Non-parametric, can be seen as KDE-based clustering. |
| **Fuzzy C-Means**                           | Allows each point to belong to multiple clusters with varying degrees of membership. | Soft clustering alternative to K-Means.              |
| **Expectation-Maximization (EM) Algorithm** | General probabilistic clustering using latent variable estimation.                   | Foundation for many model-based approaches.          |

🧠 Common use cases: pattern recognition, soft segmentation, image processing, probabilistic grouping.