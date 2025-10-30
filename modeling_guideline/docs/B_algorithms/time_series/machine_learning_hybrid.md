# Machine Learning & Hybrid Approaches

Essence: use general ML algorithms adapted for temporal data (without explicit time-series assumptions).

| Algorithm                                           | Description                                                   | Typical Use Cases                                          |
| --------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| **Random Forest Regressor (with lag features)**     | Uses lagged variables as features.                            | Quick baselines, interpretable forecasts.                  |
| **Gradient Boosting (XGBoost, LightGBM)**           | Models nonlinear time dependencies using engineered features. | Tabular time-series forecasting.                           |
| **SVR (Support Vector Regression)**                 | Captures nonlinear trends and periodicity.                    | Small datasets, smooth signals.                            |
| **Hybrid ARIMA–GARCH / ARIMA–XGBoost**              | Combines statistical and ML models.                           | Financial time series, electricity load, sales prediction. |
| **Quantile Regression Forests / Gradient Boosting** | Predicts confidence intervals (uncertainty-aware forecasts).  | Risk or scenario forecasting.                              |
