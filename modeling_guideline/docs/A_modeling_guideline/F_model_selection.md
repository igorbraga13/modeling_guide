This is the design phase

## 🧠 Development and Hyperparameter Tuning

The algorithm(s) used, architectures if relevant (e.g., XGBoost, Neural Net).

Train/test splits, metrics used, hyperparameters tuning, validation strategy (CV, OOT, etc).

### Hyperparameter Tuning
A busca de hiperparêmetro é importante para...Temos diversas técnicas de busca para otimização de hiperparâmetros

#### Grid Search
O Grid Search testa todas as combinações possíveis de hiperparâmetros dentro de um grid definido por você.

```python
param_grid = {
    'learning_rate': [0.01, 0.1],
    'max_depth': [3, 5, 7]
}
```
→ Total de combinações: 2 × 3 = 6 modelos treinados

✅ Vantagens:

- Explora exaustivamente o espaço definido.
- Útil quando você tem poucos parâmetros e valores específicos em mente.

❌ Desvantagens:

- Muito lento se o número de combinações for alto.
- Pode gastar tempo testando combinações irrelevantes ou redundantes.

Exemplo de código utilizando validação cruzada e RMSE como métrica principal

```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import make_scorer, mean_squared_error

# Função de erro RMSE (quanto menor, melhor)
def rmse(y_true, y_pred):
    return mean_squared_error(y_true, y_pred, squared=False)

rmse_scorer = make_scorer(rmse, greater_is_better=False)

# Grade de hiperparâmetros
param_grid = {
    'learning_rate': [0.01, 0.05, 0.1],
    'max_iter': [300, 500], #Evite max_iter muito alto no início — use valores moderados para teste rápido.
    'max_leaf_nodes': [15, 31],
    'min_samples_leaf': [10, 20],
    'l2_regularization': [0.0, 1.0]
}

# Grid Search com validação cruzada
grid_search = GridSearchCV(
    estimator=HistGradientBoostingRegressor(),
    param_grid=param_grid,
    scoring=rmse_scorer,
    cv=3,
    verbose=2,
    n_jobs=-1 #usar todos os núcleos do processador.
)

# Executa busca
grid_search.fit(X, y)

# Mostra melhor combinação
print("Melhores hiperparâmetros encontrados:")
print(grid_search.best_params_)

print(f"Melhor RMSE médio (validação cruzada): {-grid_search.best_score_:.4f}")

# Modelo otimizado
best_model = grid_search.best_estimator_
```

#### Randomized Search

O Randomized Search seleciona aleatoriamente combinações de hiperparâmetros dentro de um grid definido, por um número fixo de tentativas (n_iter).

```python
param_grid = {
    'learning_rate': [0.01, 0.05, 0.1],
    'max_depth': [3, 5, 7],
    'min_samples_leaf': [10, 20, 30]
}
```
→ Possíveis combinações = 3 × 3 × 3 = 27
→ Mas você define n_iter=10, então só 10 combinações aleatórias serão testadas

✅ Vantagens:

- Muito mais eficiente em tempo.
- Pode encontrar bons resultados rapidamente mesmo em grids grandes.
- Permite testar mais parâmetros simultaneamente com menos custo.

❌ Desvantagens:

- Pode não testar a melhor combinação possível, pois é aleatório.
- Resultados variam a cada execução (a menos que defina random_state).

#### Bayesina Optimization
Podemos utilizar o optuna ou hyperopt

#### Convex Algorithms

#### Genetic Algorithms

#### Hyperband

#### Overview

| Situação                                     | Melhor escolha      |
| -------------------------------------------- | ------------------- |
| Poucos hiperparâmetros e valores específicos | Grid Search       |
| Muitos hiperparâmetros ou ranges grandes     | Randomized Search |
| Tempo de execução limitado                   | Randomized Search |
| Busca precisa e exaustiva é prioridade       | Grid Search       |

## ✅ Validation and Evaluation

Detailed evaluation: metrics results (ROC AUC, F1-score, KS, etc.), important variables.

Desvio padrao da feature para olhar drift feature a feature juntamente de KS, AUC e PR-AUC

https://christophm.github.io/interpretable-ml-book/

### Model Bias and Fairness Analysis

## 💡 Interpretation and Explanability