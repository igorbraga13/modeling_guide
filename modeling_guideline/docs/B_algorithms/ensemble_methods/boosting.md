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

## CatBoost
CatBoost is a gradient boosting library that is particularly effective for datasets with categorical features. It employs techniques to prevent target leakage and overfitting, making it robust for various applications.

## XGBoost
XGBoost is an optimized implementation of gradient boosting that includes regularization techniques, parallel processing, and efficient handling of missing values. It is widely used in machine learning competitions due to its performance and speed.

Hyperparameter search spaces:

|Hyperparameter        | Description                                                                                                       | Distribution|Range     |
|----------------------|-------------------------------------------------------------------------------------------------------------------|-------------|--------- |
|max_depth             | Maximum depth of a tree. Increasing this value makes the model more complex. 0 is an option in a loss-guided growing policy | Uniform     | 0:14     |
|learning_rate (eta)   | Controls the step size at each iteration to prevent overfitting. Lower value requires more trees                  | Fixed       | 0.01     |
|n_estimators          | Number of boosting rounds or trees to build. Too many may lead to overfitting                                     | Variable    | See text |
|gamma (min_split_loss)| Minimum loss reduction required for a further partition on a leaf node. Higher values make the model conservative | Log-uniform | 0:5      |
|min_child_weight      | Minimum sum of instance weight needed in a child. Higher values prevent learning specific relations               | Log-uniform | 1:100    |
|subsample             | Fraction of training data sampled for each tree. Prevents overfitting, but too low can cause underfitting         | Log-uniform | 0.5:1    | 
|colsample_bylevel     | Fraction of features sampled for each tree. Similar to max_deatures in RandomForest                               | Log-uniform | 0.5:1    |
|reg_alpha             | L1 regularization term on weights. Helps in preventing overfitting                                                | Log-uniform | 0:1      |
|reg_lambda            | L2 regularization term on weights. Increasing it makes the model more conservative                                | Log-uniform | 1:4      |
|max_delta_step        |Only recomended for extremely imbalance datasets| Log-uniform | 0:10    |
