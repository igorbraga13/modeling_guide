A precisão mede a quantidade de vezes que o seu modelo acerta em relação ao total de vezes que ele tenta acertar.

Em outras palavras: A precisão é o número de exemplos que seu modelo previu como positivos e acertou dividido pelo número total de exemplos que ele previu como positivos. Ou seja, mede o quanto podemos confiar em um modelo quando ele prevê que um exemplo pertence a uma determinada classe.

$$\frac{TP}{TP+FP}$$

```python
from sklearn.metrics import precision_score

precision = precision_score(y_true, y_pred)
```

## Contexto de Antifraude

Definição: entre todas as transações que o modelo marcou como fraude, qual proporção realmente era fraude. Mede quão confiável é a detecção de fraude.

(TP = fraudes detectadas corretamente, FP = clientes legítimos bloqueados por engano)

Importância: alto precision = menos clientes honestos bloqueados.

Risco: se focar só em precision, pode perder muitas fraudes (baixo recall).

Conclusão: Se você prioriza precision, agrada clientes legítimos, mas arrisca deixar passar fraudes