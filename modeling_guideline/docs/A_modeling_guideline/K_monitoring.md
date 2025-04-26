How model performance and drift will be monitored after go-live.

What are the known issues, assumptions, and limitations? Can you monitor something to this issues

## 📈 1. Prediction Quality Monitoring

Monitor if the model predictions start behaving differently:

|What to Monitor | How to Monitor | Why|
|----------------|----------------|----|
|Score Distribution | Plot the distribution of prediction scores (histogram). | Detect if model outputs are drifting.|
|Population Stability Index (PSI) | Compare score distributions over time. | Identify if input population is changing.|
|Performance Metrics | Calculate metrics (e.g., AUC, KS, Precision, Recall) periodically. | See if the model is getting worse at predicting.|

## 🛠 2. Input Data Monitoring (Data Drift)

Monitor the input variables going into your model:

|What to Monitor | How to Monitor | Why|
|----------------|----------------|----|
Feature Distribution Drift | Track mean, std, min, max of key features. Compare with training. | Detect if the real-world data is changing.
Missing Values Rate | Monitor missing data per feature. | Rising missingness may crash or bias your model.
Feature Correlations | Monitor if correlations between variables shift heavily. | Indicates data relationships are changing.

## ⚠️ 3. Model Operational Monitoring

Monitor the operational and technical aspects:

|What to Monitor | How to Monitor | Why|
|----------------|----------------|----|
Latency | Measure prediction time. | To catch slowdowns or bottlenecks.
Throughput | Number of predictions made per second/minute. | To detect overloads.
Error Rates | Log any errors during predictions. | To detect technical failures (bad inputs, infra issues).

## 🚨 4. Alerts Setup
You should automatically trigger alerts when something goes wrong:

- If PSI > 0.25 → possible drift → send alert
- If AUC drops below threshold → send alert
- If missing data > 10% in key features → send alert
- If model response time > X ms → send alert

You can configure alerts using tools like:

- Datadog
- Prometheus + Grafana
- AWS CloudWatch
- Or even simple scripts with emails/slack notifications

## 🧠 5. Best Practices

✅ Monitoring is separate from training
✅ Monitoring runs automatically
✅ Monitoring dashboards are shared with Data Science and MLOps
✅ Monitoring results are audited (especially if you're in banking/regulated sectors)

## 🚀 Bonus: Tools that help you monitor automatically

- Evidently AI (Open-source, great for drift monitoring)
- WhyLabs (SaaS monitoring for ML models)
- Neptune.ai (Experiment and model monitoring)
