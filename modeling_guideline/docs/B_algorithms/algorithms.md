## Supervised

### Regressão 

#### Regressão Linear

#### Regressão Logistica

### Cubist Regression

Modelo de regressão que utiliza recortes simples de árvores de decisão e cria modelos de regressão dentro de cada regra

```{r}
Cubist::cubist(
  x = X,
  y = Y,
  committees = 1, 
  control = cubistControl(
    unbiased = FALSE,
    rules = 100,
    extrapolation = 100,
    sample = 0,
    seed = sample.int(4096, size = 1) - 1L,
    label = "outcome"
    )
  )
```

##### Binomial

##### Binomial Negativa
É mais flexível que a Poisson, pois possui um parâmetro que ajusta a variância independentemente da média.

##### Multinomial

É mais geral que a regressão logística porque a variável dependente não está restrita a duas categorias, mas a um número finito maior que 2 podendo ser ordinal ou não.

##### Poisson

É um caso especial da distribuição binomial negativa. Assume média e variâncias iguais (tal qual a regressão assume dados normais)

Tem como objetivo modelar contagens de eventos infinitos (Sem restrição para o número máximo do target). Muitas vezes funciona com variáveis contínuas não negativas

#### Regressão Quantílica

#### Regressão zoib (Zero-One-Inflated Beta)

### Generalized Additive Model (GAM)

### Decision Tree

Árvore de decisão baseada em regras

### Random Forest (ensemble)

### Gradiente Boosted Regression Trees

### Support Vector Machine

### Naive Bayes

### XGBoost

### Lgbm

### Catboost

### AdaBoost

Ajusta o peso das amostras em cada iteração, as amostras mal classificadas recebem mais peso. O algoritmo foca em corrigir as amostras difíceis. O modelo final será a combinação de classificadores fracos ponderados.

### Gradient Boosting

Diferente do AdaBoosting, vai ajustar os erros residuais (diferença entre valor real e previsão) em cada iteração. Cada modelo irá tentar prever e corrigir os erros das rodadas anteriores.

Exemplo: O gradient começa com uma previsão simples de 180 mil para todas as casas e vai ajustando a cada iteração as previsões, baseando na tentativa de descobrir o erro residual. A cada rodada o modelo vai ajustar os erros residuais. Na tabela abaixo o erro inicial de +20.000 na casa 1 foi ajustado para 10.000, resultando em uma nova previsão de 190.000. O resultado final é a soma das correções feitas em cada rodada, aproximando-se do valor real

| Casa | Preço Real | Predição (Round1) | Erro Residual (Round1) | Previsão Residual | Nova Predição |
|:----:|:----------:|:-----------------:|:----------------------:|:-----------------:|:-------------:|
|  1   |  200.000   |      180.000      |        +20.000         |      +10.000      |    190.000    |
|  2   |  300.000   |      180.000      |        +120.000        |      +70.000      |    250.000    |
|  3   |  250.000   |      180.000      |        +70.000         |      +40.000      |    220.000    |


### RusBoost

### Bagging (Bootstrap Aggregation)

Em caso de termos muitas variáveis categóricas o Catboost é utilizado, evitando ter que fazer diversas dummies para a modelagem

### Neural Network

Se remover as camadas ocultas de uma rede neural ela se torna apenas um classificador linear simples, ou seja, pode lidar com tarefas diretas e linearmente separáveis como AND e OR mas não pode lidar com XOR (OR exclusivo) que precisa de pelo menos uma camada oculta (junto da função de ativação linear) para capturar seu padrão não linear

#### Recurrent Neural Network

#### Convolutional Neural Network

#### Graph Neural Network

## Unsupervised

### Hierarchical Clustering

### K- Clustering

#### K-Means

#### K-Median

#### K-Modes

#### Mini Batch K-Means Clustering

### Fuzzy K-Modes

É uma extensão do K-Modes, que ao invés de apontar cada objeto a um cluster, calcula o valor do grau de proximidade para cada objeto em cada cluster

### Fuzzy C-Means

É uma versão probabilistica do K-Means. Associa todos os objetos em todos os clusters, sendo que a soma de todas as associações é 1. Desse modo todos os clusters tem uma associação contínua (diferentemente do K-Means que é discreta) com cada cluster em relação a cada outro cluster

O algoritmo atribui iterativamente e computa o centróide dos clusters igual ao K-Means até que qualquer função de critério seja otimizada ou a convergência caia abaixo de um threshold pré-determinado.ld value.

Esse algoritmo não é rigoroso como o K-Means na atribuição e funciona bem para conjuntos de dados sobrepostos. No entanto, tem a mesma desvantagem que o K-Means de ter uma suposição prévia do número de clusters. Além disso, um valor de threshold baixo fornece melhores resultados, mas é mais caro do ponto de vista computacional.

### DBSCAN Clustering

### Gaussian Mixture Model (GMM)

### Jenks

Jenks, Fisher e Fisher-Jenks

### Principal Component Analysis (PCA)

Técnica de redução de dimensionalidade

## Otimizações

Antes de definir qual abordagem utilizar faz-se necessário responder algumas perguntas:
  
  - Seu problema tem uma função objetiva definida?
  - Seu problema tem solução linear?
  - Seu problema tem um espaço amostral convexo? (seu ótimo local também é global, então encontrar uma solução local é suficiente)

Respondidas as perguntas podemos optar por algoritmos de busca mais simples ou mais complexos, mas para essa decisão pode ser interessante levar em consideração o Teorema de Bolzano-Weierstrass:
  
  A complexidade de uma problema de otimização está diretamente relacionado ao tamanho do Espaço de Busca coorespondente. O processo de solução de um problema pode ser reduzido a um Algoritmo de Busca Heurística, cujo Espaço de Busca é formado por transformações sucessivas de Estados em uma certa ordem de geração e percurso, enquanto Algoritmos mais simples podem ir diretamente ao ponto ótimo.

Algoritmos heurísticos não garantem encontrar a solução ótima, mas podem encontrar boas soluções em tempo menor (no caso de problemas mais complexos) e são extremamente úteis quando o espaço de busca é grande ou a estrutura não é bem definida.

Podemos utilizar algoritmos heurísitocs quando:
  - o espaço de busca é grande, tornando a busca simples impraticável
- uma solução aproximada ou subótima é aceitável
- os dados são complexos e dinâmicos

### Algoritmos Convexos

#### Simplex

Se o seu problema tiver uma solução linear, você pode usar o Método Simplex. Ele começa na borda do poliedro das soluções viáveis porque os vértices são candidatos a soluções ótimas e permite uma exploração eficiente do espaço de soluções usando a geometria dos problemas lineares. Isso se deve ao fato de que a solução ótima de uma função linear, se existir, está em um vértice, já que funções lineares atingem máximos ou mínimos nos extremos, uma vez que não tem curvatura para alcançar ótimos no interior. Desta forma, o Simplex pode explorar os vértices sistematicamente sem computar todo o espaço de soluções.

#### Ordinary Least Squares (OLS) 

### Algoritmos Heurísticos

#### Buscas em profundidade limitada

#### Simulated Annealing

#### Genetic Algorithms