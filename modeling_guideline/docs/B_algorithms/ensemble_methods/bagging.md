
# Bagging Family (Variance Reduction — Parallel Ensembles)

Goal: reduce variance by averaging over multiple models trained on bootstrap samples.

| Algorithm                                    | Description                                                                                  | Base Model                 |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------- |
| **Bagging (Bootstrap Aggregating)**          | The original ensemble concept — averages several models trained on bootstrap-resampled data. | Any model (usually trees). |
| **Random Forest**                            | Collection of randomized decision trees; each trained on a subset of data and features.      | Decision Tree (CART).      |
| **Extra Trees (Extremely Randomized Trees)** | Like Random Forest, but splits chosen at random instead of by best criterion.                | Decision Tree.             |
| **Bagged SVM / Bagged kNN**                  | Bagging applied to other learners.                                                           | SVM, kNN, etc.             |
