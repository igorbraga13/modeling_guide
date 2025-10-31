Before starting any modeling effort, it’s crucial to deeply understand the business problem and the true need behind it. Many data science projects fail not because of poor modeling, but because the problem was poorly framed from the outset.

Not every challenge requires a complex machine learning solution—often, a simple rule-based approach or heuristic can deliver value faster and with less overhead. In some cases, a lightweight baseline model may be the best starting point. On the other hand, problems involving long-term predictions, personalization, or dynamic systems may benefit from more sophisticated models with greater complexity and precision.

To guide this understanding, we break the process into three key steps:

## 🔍 Discovery & Insight

This phase focuses on aligning with stakeholders to clearly define the business objective and ensure the team is solving the right problem. It’s not just about understanding what the stakeholder wants, but uncovering why they want it (e.g., reduce churn, predict default, optimize acquisition).

Start by partnering with the business area to define:

- **The objective:** What is our goal? What decision are we trying to support, automate, or improve? What’s the limitation of the current process or model? What pain point are we addressing?
    
        ➤ Tip: Analyze historical data and business processes to identify 
           bottlenecks and root causes.

- **The expected impact:** How will this solution create value? Examples include reducing financial risk, increasing revenue, or improving operational efficiency. What actions or decisions will be driven by the model’s output?

- **Constraints and requirements:** Are there deadlines, regulatory rules (e.g., fairness, explainability), technical restrictions, or data access issues?

Because this step sets the foundation for the entire project, it's critical to ensure nothing important is overlooked. That includes:

- **Clarifying success metrics:** both business KPIs (e.g., approval rate, NPS, default rate) and technical performance metrics (e.g., AUC, KS, precision, recall)

- **Understanding the decision context:** who will use the model, how often, and how the output will be interpreted and acted upon

- **Scoping the solution space:** determine whether a business rule, statistical model, or machine learning solution is most appropriate given the complexity, timeline, and available data

        📌 Best Practice: If available, review existing dashboards, reports,
            previous models, or experiment results to understand what’s already
            been tried and what gaps remain.

On this step we present a [Discovery]("../B_artifacts/discovery.md")

---

## 🎯 Target Definition 

Once the problem is well understood, the next step is to define the target variable—the outcome the model will predict and the basis for measuring success. A well-defined target ensures that the model output is not only useful, but also measurable, actionable, and aligned with business value.

✅ Best Practices:
- **Choose a target that reflects real business value**: The outcome should be directly tied to the decision-making process and clearly represent the goal (e.g., customer default, conversion, retention).

- **Ensure it is observable and measurable:** You must be able to label historical data reliably and consistently. If the outcome isn’t recorded or is ambiguous, model performance will suffer.

- **Define the observation window:** Determine how far into the future you're trying to predict. This affects both the sampling strategy and the feature engineering process.

- **Select the appropriate target type:** Based on the problem, decide if your task is:

    - **Binary classification** (e.g., default vs. non-default)
        - **Ever:** refers to **any occurrence** during that period/ **Existence at any point** within the window.  
        - **Over:** refers to the **cumulative or final state** by the end of that period/ **Aggregate/result by the end** of the window.
    - **Regression** (e.g., expected revenue, days to churn)
    - **Multi-class classification** (e.g., customer segments, fraud types)

- **Align on evaluation metrics:** Choose metrics that reflect both model quality and business impact—e.g., precision, recall, AUC-ROC, uplift, or financial return.

        ⚠️ Avoid proxy targets that don’t reflect the real objective. For example, 
            using clicks to represent user satisfaction can mislead the modeling 
            process if the two aren’t strongly correlated.

---

## 🧩 Solution Definition

The first step in defining a solution is to determine whether the problem requires a Predictive or Prescriptive approach.

| Type of Model       | Guiding Question                                | Example                                                                                     |
| ------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 🔮 **Predictive**   | “What is likely to happen?”                     | Forecasting default probability, customer churn, demand, or sales.                          |
| 🧭 **Prescriptive** | “What should I do to achieve the best outcome?” | Deciding optimal credit limits, allocating marketing budgets, or defining logistics routes. |

👉 In other words:

- A Predictive Model estimates future outcomes based on historical data.
- A Prescriptive Model determines optimal actions based on objectives and constraints.

🎓 Practical Examples

| Scenario                | Predictive Component                 | Prescriptive Component *(e.g., Simplex, MIP)*        |
| ----------------------- | ------------------------------------ | ---------------------------------------------------- |
| **Credit Risk**         | Predict the probability of default.  | Decide the optimal credit limit for each customer.   |
| **Logistics**           | Forecast regional demand.            | Optimize routing and distribution to minimize cost.  |
| **Marketing**           | Estimate conversion rate by channel. | Allocate optimal marketing spend per channel.        |
| **Financial Portfolio** | Predict expected return and risk.    | Choose asset weights that maximize the Sharpe ratio. |

### ⚙️ From Definition to Design

Once you’ve determined whether the problem follows a Predictive or Prescriptive approach, best practices emphasize pragmatism.
Simpler approaches—such as business rules or heuristics—can often outperform complex models, especially in early iterations. These solutions are usually faster to implement, easier to explain, and sufficient to generate business value.

### 🎯 Define Usage and Impact

Before modeling, identify how the solution will be used and what impact it should create. Then, evaluate trade-offs between:

- Model complexity
- Time-to-value (speed of delivery)
- Operational constraints (data availability, monitoring, maintenance)

    💡 Ask: What is the minimum viable solution that delivers reliable value 
        with acceptable effort and risk?

### 🛠️ Recommended Starting Strategy (Predictive Context)

When appropriate, deploy a quick-win baseline model—for example, logistic regression or shallow decision trees—and evolve from there as maturity grows.

- **Start simple:**
Determine if a rule set or scorecard already meets the business need—especially when interpretability, regulatory validation, or rapid deployment is essential.

- **Deploy baseline models early:**
Techniques such as logistic regression, decision trees, or Naïve Bayes provide interpretable early wins and serve as strong reference points for future improvements.

- **Assess feasibility and maintainability:**
Consider the effort required to maintain and retrain complex models over time. In many business environments, operational simplicity outweighs marginal accuracy gains.

        🛠️ Example: In credit risk modeling, a well-structured scorecard with clear 
            thresholds may be more practical and trusted by risk committees than a 
            black-box ensemble model—particularly when regulatory transparency and 
            auditability are required.

---

## ✨ Optional Enhancements (Only If You Want to Expand Further)

### Stakeholder Map
List who is involved and who will use the model output (analysts, business teams, product, legal). This helps align communication and expectations.

### Decision Journey Mapping
Show where in the process the model will impact decisions (e.g., credit approval, campaign selection). This clarifies integration points.

### Risk/Feasibility Assessment
Include a short check for data availability, regulatory limits (e.g., fair lending laws), or black-box explainability concerns.

### Baseline/Benchmark Expectations
What existing rule or model exists? What lift is expected? This sets realistic expectations.

## Examples

- Binary target to predict if the client will or not default
- Poisson target distribution to forecast the number of days with orders of your client
