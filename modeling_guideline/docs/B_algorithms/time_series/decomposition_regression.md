# Decomposition & Regression-Based Models

Essence: separate time series into interpretable components (trend, seasonality, residual).

| Algorithm                                          | Description                                                                  | Typical Use Cases                          |
| -------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------ |
| **Classical Decomposition**                        | Splits series into trend + seasonality + residual (additive/multiplicative). | Exploratory analysis.                      |
| **STL (Seasonal-Trend Decomposition using Loess)** | Robust, non-parametric decomposition.                                        | Data with complex or changing seasonality. |
| **Regression with Time Features**                  | Uses regression with features like lag, day-of-week, month, etc.             | Forecasting with interpretable features.   |
| **Prophet (by Facebook/Meta)**                     | Additive model combining trend, seasonality, and holidays.                   | Business and operational forecasting.      |
| **TBATS / BATS**                                   | Handles complex seasonality with Box-Cox transform and trigonometric terms.  | Demand forecasting, daily/weekly cycles.   |
