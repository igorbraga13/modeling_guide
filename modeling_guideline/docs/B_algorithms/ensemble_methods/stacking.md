# Stacking Family (Meta-Learning Ensembles)

Goal: combine heterogeneous models using a second-level learner (“meta-model”).

| Algorithm                             | Description                                                                          | Meta Model                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Stacking (Stacked Generalization)** | Combines predictions of diverse models via a meta-model trained on their outputs.    | Typically Logistic Regression or a small NN. |
| **Blending**                          | Simplified stacking using a holdout validation set instead of full cross-validation. | Logistic Regression / Ridge.                 |
| **Super Learner**                     | Optimized stacking using performance-based weights (cross-validated).                | Ensemble meta-learner.                       |
