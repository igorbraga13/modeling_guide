Calculam o erro utilizando logaritmos:

$$MSLE = \frac{1}{n}\sum^{n}_{i=1}[log(1+y_{i}) - log(1+\hat{y}_{i})]^2$$

O RMSLE é a raiz do MSLE.

São úteis quando:

- O alvo possui valores muito assimétricos.
- O erro relativo importa mais que o erro absoluto.
- O alvo não possui valores negativos.

Um erro de 10 para 20 recebe tratamento semelhante a um erro de 100 para 200, pois ambos representam aproximadamente a mesma diferença proporcional.