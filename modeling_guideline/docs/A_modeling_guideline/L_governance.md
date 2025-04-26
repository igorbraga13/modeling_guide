## Model Governance

|Aspect | What to include | Why it's important|
|-------|-----------------|-------------------|
Ownership | Name the owner (Data Scientist, Product Manager) responsible for the model. | Accountability.
Version Control | Keep a changelog of model versions. | Track improvements and regressions.
Approval Process | Who needs to sign off before going live (e.g., Risk, Compliance)? | Governance and traceability.
Model Risk Tier | Classify risk level (e.g., Low, Medium, High) based on business impact. | Prioritize monitoring and controls.

    Example from Revolut:
    "Model Owner: Igor Braga (Credit Data Scientist). Model Risk Tier: Medium. 
     Approved by Credit Risk Committee (April 2025)."

## Ethical Considerations

LGPD

|Aspect | What to include | Why it's important|
|-------|-----------------|-------------------|
Fairness and Bias Testing | Test for bias across gender, age, ethnicity, etc. (if possible). | Avoid discrimination and unfair practices.
Explainability | How understandable are the model's decisions? Are tools like SHAP used? | Improve trust and user understanding.
Impact Analysis | Analyze potential harm or negative side-effects. | Mitigate unintended consequences.

    Example sentence Revolut would use:
    "No statistically significant bias found across gender or age groups. 
     SHAP values are used for local interpretability at individual decision level."

## Regulatory Compliance

Sox

IFRS9

|Aspect | What to include | Why it's important|
|-------|-----------------|-------------------|
Data Privacy and Protection | Does the model handle personal data? Is it GDPR-compliant? | Legal requirement.
Right to Explanation | Under GDPR, customers may ask for explanation of decisions. Can your model provide it? | Regulatory requirement (GDPR Article 22).
Record Keeping | Keep full audit logs of model outputs and decisions. | For regulatory inspections and audits.

Example sentence Revolut would use:
"The model complies with GDPR, ensuring no processing of sensitive personal attributes. Audit logs are maintained for 12 months."
