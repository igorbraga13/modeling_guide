Raiz quadrada do [MSE](mse.md):

$$RMSE = \sqrt{\frac{1}{n}\sum^{n}_{i=1}(y_i - \hat{y_i})^{2}}$$

Tem a mesma unidade da variável-alvo.

Exemplo: para prever valores em reais, um RMSE = 800 representa um erro típico próximo de R$ 800.

Penaliza erros grandes mais que o [MAE](mae.md).
Mais interpretável que o MSE.
Quanto menor, melhor.

Quando o RMSE é muito maior que o MAE, isso pode indicar alguns erros extremos.