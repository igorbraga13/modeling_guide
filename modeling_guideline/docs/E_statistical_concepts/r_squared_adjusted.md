O [R²](r_squared.md) padrão tende a aumentar quando novas variáveis são adicionadas, mesmo que elas não sejam úteis. O R² ajustado penaliza a inclusão desnecessária de variáveis:

$$R^{2}_{ajustado}= 1 - (1-R^{2}) \frac{n-1}{n-p-1}$$

Onde:

n: número de observações.

p: número de variáveis explicativas.

É mais adequado para comparar modelos com quantidades diferentes de variáveis.