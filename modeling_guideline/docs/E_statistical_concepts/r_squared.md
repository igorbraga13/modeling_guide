Mede quanto da variação da variável-alvo é explicada pelo modelo:

$$R^{2}=1−\frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2}$$

Exemplo:

$$$R^{2}=0,70$$

Significa que o modelo explica aproximadamente 70% da variabilidade observada no alvo.

R² = 1: ajuste perfeito.
R² = 0: equivalente a sempre prever a média.
R² < 0: pior que simplesmente prever a média.

Um R² alto não garante que o modelo seja adequado. Ele pode estar [sobreajustado](overfitting.md) ou violar pressupostos da regressão.

# Diferenças na interpretação

A interpretação do R² em modelos lineares e não lineares é diferente. Enquanto no modelo linear o R² representa o quanto da variabilidade o modelo explica, o [R² (Ajustado de McFadden)](r_squared_adjusted.md) em modelos não lineares representa o quanto o modelo explica em relação ao modelo nulo

Interpretação prática:

Modelo Linear (R²): 80% da variância foi explicada

Modelo não Linear (R² Ajustado de McFadden): O modelo reduziu aproximadamente 14,7% da incerteza que existia no modelo sem variáveis