# Boosting Family (Bias Reduction — Sequential Ensembles)

Goal: reduce bias by training models sequentially, each correcting the mistakes of the previous.

| Algorithm                               | Description                                                                | Base Model                       |
| --------------------------------------- | -------------------------------------------------------------------------- | -------------------------------- |
| **AdaBoost (Adaptive Boosting)**        | Sequentially reweights samples to focus on misclassified points.           | Weak learners (usually stumps).  |
| **Gradient Boosting (GBM)**             | Fits models to residual errors via gradient descent on a loss function.    | Decision Tree (usually shallow). |
| **XGBoost (Extreme Gradient Boosting)** | Optimized GBM with regularization, parallelization, and sparsity handling. | Decision Tree.                   |
| **LightGBM**                            | Leaf-wise tree growth; extremely fast and memory-efficient GBM variant.    | Decision Tree.                   |
| **CatBoost**                            | Handles categorical features natively and prevents target leakage.         | Decision Tree.                   |
| **LogitBoost**                          | Variant of boosting for logistic loss functions.                           | Decision Stumps.                 |
| **GBRT / GBDT / MART**                  | General family name for gradient-boosted regression trees.                 | Decision Tree.                   |
