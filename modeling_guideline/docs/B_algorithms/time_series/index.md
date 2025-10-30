🧠 Practical Tips

Always test for stationarity (ADF test) before ARIMA-based models.

Use differencing or detrending to handle non-stationary series.

Evaluate performance with MAE, RMSE, MAPE, or sMAPE.

Split data chronologically (never randomly) for validation.

Combine statistical baselines (ARIMA, Holt-Winters) with ML models for robust ensembles.

---

⚙️ Key Concepts

| Concept                        | Description                                                             |
| ------------------------------ | ----------------------------------------------------------------------- |
| **Stationarity**               | Mean and variance constant over time — essential for ARIMA-type models. |
| **Seasonality**                | Repeating patterns (daily, weekly, yearly).                             |
| **Autocorrelation (ACF/PACF)** | Measures dependence between past and current values.                    |
| **Lag Features**               | Previous values used as predictors in ML approaches.                    |
| **Exogenous Variables (X)**    | External inputs affecting the target (e.g., temperature, holidays).     |
| **Forecast Horizon**           | Number of future steps to predict (short vs long term).                 |
