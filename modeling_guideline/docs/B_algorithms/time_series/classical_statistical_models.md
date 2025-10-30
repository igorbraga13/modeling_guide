# Classical Statistical Models

Essence: model temporal dependence through lagged relationships and error terms.

| Algorithm                                                | Description                                                                  | Typical Use Cases                                            |
| -------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **AR (AutoRegressive)**                                  | Predicts current value using past observations.                              | Stock prices, demand forecasting.                            |
| **MA (Moving Average)**                                  | Models the current value as a function of past residuals.                    | Noise smoothing, short-term prediction.                      |
| **ARMA (AR + MA)**                                       | Combines autoregressive and moving average components for stationary series. | Stationary economic or financial data.                       |
| **ARIMA (AutoRegressive Integrated Moving Average)**     | Adds differencing to handle non-stationarity.                                | General-purpose time series forecasting.                     |
| **SARIMA (Seasonal ARIMA)**                              | Adds seasonal components to ARIMA.                                           | Series with seasonality (monthly sales, energy consumption). |
| **ARIMAX / SARIMAX**                                     | ARIMA models with exogenous regressors (external variables).                 | Forecasting with external factors (marketing, temperature).  |
| **VAR (Vector AutoRegression)**                          | Multivariate extension that models interrelated time series.                 | Macroeconomic indicators, financial assets.                  |
| **VECM (Vector Error Correction Model)**                 | Handles cointegrated series (long-term equilibrium relationships).           | Economics, currency exchange, bond yields.                   |
| **ARCH (Autoregressive Conditional Heteroskedasticity)** | Models time-varying variance (volatility).                                   | Financial volatility modeling.                               |
| **GARCH (Generalized ARCH)**                             | Extension of ARCH with multiple lag terms.                                   | Risk modeling, portfolio volatility.                         |
