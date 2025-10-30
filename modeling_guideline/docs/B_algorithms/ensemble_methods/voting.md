# Voting / Averaging Family (Simple Aggregations)

Goal: combine independent model outputs through direct averaging or majority vote.

| Algorithm                      | Description                                                          | Use Case                                 |
| ------------------------------ | -------------------------------------------------------------------- | ---------------------------------------- |
| **Hard Voting**                | Majority rule — picks the class predicted by most models.            | Classification (discrete labels).        |
| **Soft Voting**                | Average of predicted probabilities (weighted or not).                | Probabilistic classification.            |
| **Weighted Averaging**         | Weighted mean of predictions based on validation performance.        | Regression or calibrated classification. |
| **Bayesian Model Combination** | Similar to averaging but with Bayesian weighting (non-hierarchical). | Regression or forecasting.               |
