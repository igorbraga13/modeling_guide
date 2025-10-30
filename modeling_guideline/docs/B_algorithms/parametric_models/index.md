A parametric model is a model with a strong assumption about the data's underlying distribution and have a fixed number of parameters.

Modelos que assumem uma forma funcional explícita entre as variáveis explicativas e o alvo (y = f(X; θ)),
sendo totalmente definidos por um conjunto finito de parâmetros θ

## Linear Models

Modelos onde f(X; θ) é uma combinação linear dos preditores.

| Modelo                              | Descrição                                                                       | Exemplos de uso                                        |
| ----------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Ordinary Least Squares (OLS)**    | Estima coeficientes por mínimos quadrados; base para todos os modelos lineares. | Modelos de risco, precificação, baseline de regressão. |
| **Weighted Least Squares (WLS)**    | Ajusta pesos para lidar com variâncias não constantes dos erros.                | Dados heterocedásticos.                                |
| **Generalized Least Squares (GLS)** | Considera correlação entre erros.                                               | Séries temporais, dados longitudinais.                 |
| **Ridge Regression (L2)**           | Penaliza o tamanho dos coeficientes (shrinkage).                                | Multicolinearidade.                                    |
| **Lasso Regression (L1)**           | Zera automaticamente coeficientes irrelevantes.                                 | Seleção de variáveis.                                  |
| **Elastic Net**                     | Combina penalizações L1 e L2.                                                   | Alta dimensionalidade com correlação entre features.   |
| **Partial Least Squares (PLS)**     | Projeta os preditores em componentes correlacionados com o alvo.                | Espectrometria, bioinformática.                        |

## Generalized Linear Models (GLM)

Extensão dos modelos lineares para permitir outras distribuições de erro e funções de ligação.

| Modelo                              | Família       | Link Function       | Aplicações                                      |
| ----------------------------------- | ------------- | ------------------- | ----------------------------------------------- |
| **Logistic Regression**             | Binomial      | Logit               | Classificação binária (default, fraude, churn). |
| **Probit Regression**               | Binomial      | Probit (normal CDF) | Alternativa à logística.                        |
| **Poisson Regression**              | Poisson       | Log                 | Modelagem de contagens (sinistros, transações). |
| **Negative Binomial Regression**    | Neg. Binomial | Log                 | Contagens com sobredispersão.                   |
| **Gamma Regression**                | Gamma         | Log ou inversa      | Variáveis contínuas positivas (custos, tempos). |
| **Inverse Gaussian Regression**     | Inv. Gaussian | Inversa quadrática  | Tempo até evento.                               |
| **Multinomial Logistic Regression** | Multinomial   | Logit               | Classificação multiclasse.                      |
| **Ordinal Logistic Regression**     | Ordinal       | Cumulative Logit    | Ratings, níveis de risco.                       |

## Discriminant Analysis Family

Classificadores lineares baseados em suposições gaussianas (paramétricas) sobre cada classe.

| Modelo                                                   | Descrição                                                      | Aplicações                        |
| -------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------- |
| **Linear Discriminant Analysis (LDA)**                   | Supõe distribuição normal com covariância igual entre classes. | Classificação linear simples.     |
| **Quadratic Discriminant Analysis (QDA)**                | Permite covariâncias diferentes entre classes.                 | Classes com dispersões distintas. |
| **Regularized Discriminant Analysis (RDA)**              | Híbrido entre LDA e QDA via shrinkage.                         | Pequenas amostras, colinearidade. |
| **Partial Least Squares Discriminant Analysis (PLS-DA)** | Variante supervisionada do PLS para classificação.             | Dados espectrais e biomédicos.    |

## Generalized Additive Models (GAM)

Extensão paramétrica semi-flexível dos GLMs — soma de funções suaves univariadas, mantendo a estrutura estatística.

| Modelo                               | Descrição                                               | Aplicações                              |
| ------------------------------------ | ------------------------------------------------------- | --------------------------------------- |
| **Additive Model (AM)**              | Modelo aditivo puro (sem link function).                | Efeitos não lineares suaves.            |
| **Generalized Additive Model (GAM)** | Usa funções spline com penalização em um GLM.           | Risco de crédito, marketing mix, saúde. |
| **Penalized GAM (P-GAM)**            | Adiciona controle de complexidade sobre as suavizações. | Prevenção de overfitting.               |

## Polynomial and Spline Regression

Modelos paramétricos de regressão não linear baseados em expansões determinísticas.

| Modelo                    | Descrição                                                 | Aplicações                    |
| ------------------------- | --------------------------------------------------------- | ----------------------------- |
| **Polynomial Regression** | Adiciona termos quadráticos/cúbicos a variáveis lineares. | Relações curvilíneas simples. |
| **Spline Regression**     | Ajuste por partes (piecewise) com continuidade.           | Modelagem suave de efeitos.   |
| **Natural Cubic Spline**  | Spline com restrição nas extremidades (natural boundary). | Modelos suaves e estáveis.    |
| **B-Splines**             | Base spline mais eficiente numericamente.                 | GAMs e regressões suavizadas. |

## Survival and Duration Models (Parametric Only)

Modelos baseados em distribuições paramétricas para tempo até um evento.

| Modelo                                   | Descrição                                      | Aplicações                               |
| ---------------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| **Exponential Regression**               | Hazard constante no tempo.                     | Falhas mecânicas simples.                |
| **Weibull Regression**                   | Permite hazard crescente ou decrescente.       | Tempo até default ou churn.              |
| **Log-Normal / Log-Logistic Regression** | Modela log do tempo como variável normal.      | Modelagem de durações com caudas longas. |
| **Accelerated Failure Time (AFT)**       | Regressão sobre log do tempo de sobrevivência. | Saúde, crédito, telecom.                 |
