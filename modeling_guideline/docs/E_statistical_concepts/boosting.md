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

## XGBoost (Extreme Gradient Boosting)
XGBoost = Gradient Boosting + otimizações de performance + regularização avançada + suporte a missing values + paralelismo.

- Ensemble de árvores sequenciais, onde cada nova árvore corrige os erros da anterior (boosting).
- Árvores são construídas sequencialmente, cada uma tentando minimizar a função de perda.
- Usa gradiente descendente e otimiza uma função de perda regularizada (com L1/L2).
- Inclui penalização por complexidade no modelo via parâmetros como lambda e alpha.
- Geralmente tem melhor performance preditiva, especialmente em competições e problemas mais complexos.
- Tem ferramentas avançadas (ex: SHAP) e métricas como ganho e cobertura por split.

## RusBoost


## Comparing

| Aspecto                           | Gradient Boosting Tradicional | XGBoost                                        |
| --------------------------------- | ----------------------------- | ---------------------------------------------- |
| **Velocidade**                    | Mais lento                    | Mais rápido (implementado em C++, paralelismo) |
| **Regularização**                 | Básico ou inexistente         | Inclui L1 e L2 (evita overfitting)             |
| **Manuseio de valores faltantes** | Pode exigir tratamento manual | XGBoost trata automaticamente                  |
| **Paralelização**                 | Serial                        | Paraleliza construção de árvores               |
| **Função de perda personalizada** | Limitado                      | Suporta funções de perda customizadas          |
| **Importância de variáveis**      | Simples                       | Mais opções e precisão                         |
| **Controle de complexidade**      | Por profundidade da árvore    | Por número de folhas + penalidade              |


| Característica                      | Decision Tree                | Random Forest                | Gradient Boosting                   | XGBoost (Extreme GB)                  | LightGBM                                   |
| ----------------------------------- | ---------------------------- | ---------------------------- | ----------------------------------- | ------------------------------------- | ------------------------------------------ |
| **Tipo**                            | Árvore única                 | Ensemble (bagging)           | Ensemble (boosting sequencial)      | Boosting com regularização avançada   | Boosting otimizado para performance        |
| **Construção**                      | Top-down, greedy split       | Muitas árvores independentes | Árvores construídas sequencialmente | Igual ao GB, mas com melhorias        | Árvores construídas com histogramas        |
| **Overfitting**                     | Alto risco                   | Reduzido via agregação       | Reduzido com regularização          | Reduzido com L1/L2 + early stopping   | Reduzido com regularização e early stop    |
| **Velocidade de treino**            | Muito rápido                 | Médio (pode ser paralelo)    | Mais lento (sequencial)             | Mais rápido com otimizações paralelas | Muito rápido com histogramas + paralelismo |
| **Precisão**                        | Baixa a média                | Boa                          | Alta                                | Muito alta                            | Similar ou melhor que XGBoost              |
| **Interpretação**                   | Fácil (visualização simples) | Média (muitas árvores)       | Difícil (ensemble sequencial)       | Difícil                               | Difícil                                    |
| **Paralelização**                   | Nativa                       | Sim                          | Limitada                            | Sim (com divisão em blocos)           | Sim (mais eficiente)                       |
| **Uso de memória**                  | Baixo                        | Alto (várias árvores)        | Médio a alto                        | Médio                                 | Muito eficiente com grandes dados          |
| **Trabalha bem com dados esparsos** | Não                          | Não                          | Parcialmente                        | Sim (nativamente)                     | Sim (ótimo para sparse/dense)              |
| **Suporte a missing values**        | Não nativo                   | Não nativo                   | Depende da implementação            | Sim                                   | Sim                                        |

✅ Decision Tree: simples e interpretável, bom para baseline ou pequenos dados.

✅ Random Forest: robusto, boa performance geral, ótimo para evitar overfitting.

✅ Gradient Boosting: mais preciso que Random Forest, porém mais lento.

✅ XGBoost: versão otimizada do GB, com regularização e alta performance.

✅ LightGBM: ideal para grandes volumes de dados, muito rápido e eficiente.