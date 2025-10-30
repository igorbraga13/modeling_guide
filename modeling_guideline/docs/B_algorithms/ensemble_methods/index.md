| Type                                | Base Models                | Mechanism                                                                 | Examples                                                  | Key Characteristics                        |
| ----------------------------------- | --------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------- |
| **Bagging (Bootstrap Aggregating)** | Decision Trees              | Trains multiple trees on bootstrap samples and combines them by averaging or voting | 🎯 *Random Forest*, *Extra Trees*                         | Reduces variance                            |
| **Boosting**                        | Shallow trees (*stumps*)    | Builds sequential models, each focusing on correcting previous errors     | 🔥 *XGBoost*, *LightGBM*, *AdaBoost*, *CatBoost*, *GBM*   | Reduces bias and variance                   |
| **Stacking / Blending**             | Any model type              | Combines predictions from multiple algorithms through a meta-model        | 🧠 *Stacked Generalization*, *Blending*, *Super Learner*  | Leverages diversity across model families   |
| **Voting / Averaging**              | Any model type              | Averages or votes the predictions of multiple independent models          | ⚙️ *Soft Voting*, *Hard Voting*, *Weighted Averaging*     | Easy to implement and interpret             |
| **Specialized Ensembles**           | Trees or Neural Networks    | Variants or extensions for specific contexts                              | 💡 *RUSBoost*, *SMOTEBoost*, *Snapshot Ensembles*         | Adapted for imbalanced data or Deep Learning |

---

### 📊 General Characteristics

✅ **Improves performance and robustness** — reduces both bias (Boosting) and variance (Bagging).  
🔁 **Computationally expensive** — multiple models must be trained.  
⚠️ **Less interpretable** — especially with complex or numerous base learners.  
🧱 **Often tree-based**, but can combine heterogeneous models (GLM, SVM, NN).  

---

### 💡 Practical Notes

- **Bagging** is *parallel* → models are trained independently.  
- **Boosting** is *sequential* → each model depends on previous residuals.  
- **Stacking** is *hierarchical* → combines different models via meta-learning.  
- **Voting / Averaging** is *simple and interpretable* → a lightweight baseline ensemble.  
- **Specialized methods** like *RUSBoost* and *SMOTEBoost* handle **imbalanced classes**,  
  while *Snapshot Ensembles* apply ensemble principles within deep neural networks.

---

> 🔗 **Relation to other families:**
> - **Tree-Based Models:** provide the foundation for most ensemble architectures.  
> - **Deep Learning:** includes ensemble variants like *Snapshot* and *Model Averaging*.  
> - **Bayesian Methods:** can form ensembles via *Bayesian Model Averaging (BMA)*.  
> - **Hybrid Models:** combine ensembles with other paradigms (e.g., Deep + Boosting, Graph + RF).
