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

## 🎯 Target Definition

Once the problem is well understood, the next step is to define the target variable—the outcome the model will predict and the basis for measuring success. A well-defined target ensures that the model output is not only useful, but also measurable, actionable, and aligned with business value.

✅ Best Practices:
- **Choose a target that reflects real business value**: The outcome should be directly tied to the decision-making process and clearly represent the goal (e.g., customer default, conversion, retention).

- **Ensure it is observable and measurable:** You must be able to label historical data reliably and consistently. If the outcome isn’t recorded or is ambiguous, model performance will suffer.

- **Define the observation window:** Determine how far into the future you're trying to predict. This affects both the sampling strategy and the feature engineering process.

- **Select the appropriate target type:** Based on the problem, decide if your task is:

    - **Binary classification** (e.g., default vs. non-default)
    - **Regression** (e.g., expected revenue, days to churn)
    - **Multi-class classification** (e.g., customer segments, fraud types)

- **Align on evaluation metrics:** Choose metrics that reflect both model quality and business impact—e.g., precision, recall, AUC-ROC, uplift, or financial return.

        ⚠️ Avoid proxy targets that don’t reflect the real objective. For example, 
            using clicks to represent user satisfaction can mislead the modeling 
            process if the two aren’t strongly correlated.

### Classification

#### Ever

#### Over

### Regression

## 💡 Solution Definition

Identify how the model will be used and what impact it should have.

## ✨ Optional Enhancements (Only If You Want to Expand Further)

### Stakeholder Map
List who is involved and who will use the model output (analysts, business teams, product, legal). This helps align communication and expectations.

### Decision Journey Mapping
Show where in the process the model will impact decisions (e.g., credit approval, campaign selection). This clarifies integration points.

### Risk/Feasibility Assessment
Include a short check for data availability, regulatory limits (e.g., fair lending laws), or black-box explainability concerns.

### Baseline/Benchmark Expectations
What existing rule or model exists? What lift is expected? This sets realistic expectations.
