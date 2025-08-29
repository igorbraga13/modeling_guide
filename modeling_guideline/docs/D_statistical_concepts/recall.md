Também conhecido como taxa de detecção, o recall mede a quantidade de vezes que o seu modelo acerta em relação ao total de vezes que ele deveria ter acertado.

Em outras palavras, o recall é o número de vezes que o modelo identificou como positivo corretamente dividido pelo número total de exemplos que realmente deveria ter identificado como positivo. Ou seja, de todas as pessoas que ele deveria classificar como positivas, quantas ele acertou.

$$\frac{TP}{TP+FN}$$

## Contexto de Antifraude

Definição: entre todas as transações fraudulentas reais, qual proporção o modelo conseguiu identificar. Mede o quão bem o modelo evita deixar fraudes passarem.

(TP = fraudes detectadas corretamente, FN = fraudes que o modelo deixou passar)

Importância: alto recall = menos fraudes escapando → protege mais o empresa.

Risco: pode vir acompanhado de muitos falsos positivos (incomodando clientes legítimos).

Conclusão: Se você prioriza recall, evita mais fraudes, mas incomoda clientes legítimos (muitos bloqueios falsos).