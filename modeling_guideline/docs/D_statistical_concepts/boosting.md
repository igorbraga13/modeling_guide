Boosting é a família de métodos baseados em aprendizado sequencial de modelos fracos (normalmente, árvores rasas)

Cada novo modelo tenta corrigir os erros do anterior

No final, os modelos são combinados (por média ponderada ou soma) para formar um preditor mais forte

➡️ Ideia central: "Vamos aprender com os erros anteriores para melhorar passo a passo."


## AdaBoost

## Gradient Boosting
Gradient Boosting é uma forma específica de Boosting que:

Baseia o processo de correção de erros em gradientes do erro (função de perda)

Em cada etapa, o novo modelo é treinado para prever o gradiente negativo do erro (ou seja, a direção de maior melhora na função de perda)

Isso torna o treinamento mais matematicamente fundamentado e flexível, pois funciona com qualquer função de perda diferenciável (ex: MSE, log-loss)


### Gradient Boosting Regressor
O GradientBoostingRegressor implementa o algoritmo clássico de Gradient Boosting:

Ele treina várias árvores de decisão sequencialmente, onde cada árvore aprende a corrigir os erros cometidos pelas anteriores.

Cada árvore é construída usando o conjunto completo de amostras e features contínuas, realizando splits com base em ganhos de informação para valores exatos.

📉 Esse processo é preciso, mas computacionalmente caro quando temos muitos dados e valores contínuos, porque ele precisa testar todos os possíveis pontos de divisão.

Usamos quando:
- Seus dados são pequenos/médios
- Você precisa de precisão nos splits
- Quer explicações mais detalhadas dos critérios de divisão

Em GradientBoostingRegressor e outros modelos como [DecisionTreeRegressor](decision_trees.md), um valor NaN é um problema, pois o algoritmo precisa comparar valores numéricos para fazer os splits, mas NaN não pode ser comparado com operadores como <, >, ==, etc. Desse modo o modelo quebra com erro ou exige que você impute os valores antes (média, mediana, etc). Nesse caso podemos utilizar o HistGradientBoostingRegressor

### Histogram Gradient Boosting Regressor
O HistGradientBoostingRegressor é uma versão otimizada inspirada no LightGBM, introduzida no scikit-learn a partir da versão 0.22.

A grande diferença:

Ele constrói histogramas para representar intervalos de valores contínuos — ao invés de testar todos os valores possíveis para splits, ele só testa os limites dos bins.

Isso traz várias vantagens:
✅ Muito mais rápido e eficiente com grandes bases.

✅ Suporte nativo a valores faltantes (NaN) — eles são tratados como uma categoria separada.

✅ Memória muito mais eficiente.

⚠️ Pequena perda de precisão nos splits (porque usa aproximações via histogramas).

Usamos quando:

- Você tem muitos dados ou features contínuas
- Precisa de performance
- Tem valores ausentes (NaN)
- Está acostumado com LightGBM ou CatBoost

Quando o HistGradientBoostingRegressor encontra uma feature com valores faltantes, ele:

1. Cria um grupo separado para os NaNs (eles são um bin separado).
2. Durante o treinamento, ele aprende a onde enviar os NaN no split:
    - Para o lado direito da árvore?
    - Para o lado esquerdo?
    - Ele testa ambas as opções e escolhe a que resulta em menor erro.

## RusBoost