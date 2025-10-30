# Exponential Smoothing and Trend Methods

Essence: weighted averages with exponentially decreasing weights for older data.

| Algorithm                                       | Description                                                          | Typical Use Cases                           |
| ----------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------- |
| **Simple Exponential Smoothing (SES)**          | Smooths data with one smoothing parameter (no trend or seasonality). | Short-term forecasts.                       |
| **Holt’s Linear Trend Method**                  | Adds a trend component to SES.                                       | Linear trends in sales or demand.           |
| **Holt-Winters (Triple Exponential Smoothing)** | Adds both trend and seasonality.                                     | Retail, tourism, energy demand forecasting. |
| **Damped Trend Model**                          | Limits the influence of trend over time.                             | Long-horizon forecasting.                   |
