This is the design phase

## 🧠 Development and Hyperparameter Tuning

The algorithm(s) used, architectures if relevant (e.g., XGBoost, Neural Net).

Train/test splits, metrics used, hyperparameters tuning, validation strategy (CV, OOT, etc).

### Hyperparameter Tuning
A busca de hiperparêmetro é importante para...Temos diversas técnicas de busca para otimização de hiperparâmetros

#### Grid Search
O Grid Search testa todas as combinações possíveis de hiperparâmetros dentro de um grid definido por você.

```python
param_grid = {
    'learning_rate': [0.01, 0.1],
    'max_depth': [3, 5, 7]
}
```
→ Total de combinações: 2 × 3 = 6 modelos treinados

✅ Vantagens:

- Explora exaustivamente o espaço definido.
- Útil quando você tem poucos parâmetros e valores específicos em mente.

❌ Desvantagens:

- Muito lento se o número de combinações for alto.
- Pode gastar tempo testando combinações irrelevantes ou redundantes.

Exemplo de código utilizando validação cruzada e RMSE como métrica principal

```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import make_scorer, mean_squared_error

# Função de erro RMSE (quanto menor, melhor)
def rmse(y_true, y_pred):
    return mean_squared_error(y_true, y_pred, squared=False)

rmse_scorer = make_scorer(rmse, greater_is_better=False)

# Grade de hiperparâmetros
param_grid = {
    'learning_rate': [0.01, 0.05, 0.1],
    'max_iter': [300, 500], #Evite max_iter muito alto no início — use valores moderados para teste rápido.
    'max_leaf_nodes': [15, 31],
    'min_samples_leaf': [10, 20],
    'l2_regularization': [0.0, 1.0]
}

# Grid Search com validação cruzada
grid_search = GridSearchCV(
    estimator=HistGradientBoostingRegressor(),
    param_grid=param_grid,
    scoring=rmse_scorer,
    cv=3,
    verbose=2,
    n_jobs=-1 #usar todos os núcleos do processador.
)

# Executa busca
grid_search.fit(X, y)

# Mostra melhor combinação
print("Melhores hiperparâmetros encontrados:")
print(grid_search.best_params_)

print(f"Melhor RMSE médio (validação cruzada): {-grid_search.best_score_:.4f}")

# Modelo otimizado
best_model = grid_search.best_estimator_
```

#### Randomized Search

O Randomized Search seleciona aleatoriamente combinações de hiperparâmetros dentro de um grid definido, por um número fixo de tentativas (n_iter).

```python
param_grid = {
    'learning_rate': [0.01, 0.05, 0.1],
    'max_depth': [3, 5, 7],
    'min_samples_leaf': [10, 20, 30]
}
```
→ Possíveis combinações = 3 × 3 × 3 = 27
→ Mas você define n_iter=10, então só 10 combinações aleatórias serão testadas

✅ Vantagens:

- Muito mais eficiente em tempo.
- Pode encontrar bons resultados rapidamente mesmo em grids grandes.
- Permite testar mais parâmetros simultaneamente com menos custo.

❌ Desvantagens:

- Pode não testar a melhor combinação possível, pois é aleatório.
- Resultados variam a cada execução (a menos que defina random_state).

#### Bayesina Optimization
Podemos utilizar o optuna ou hyperopt

#### Convex Algorithms

#### Genetic Algorithms

#### Hyperband

#### Overview

| Situação                                     | Melhor escolha      |
| -------------------------------------------- | ------------------- |
| Poucos hiperparâmetros e valores específicos | Grid Search       |
| Muitos hiperparâmetros ou ranges grandes     | Randomized Search |
| Tempo de execução limitado                   | Randomized Search |
| Busca precisa e exaustiva é prioridade       | Grid Search       |

## ✅ Validation and Evaluation

Detailed evaluation: metrics results (ROC AUC, F1-score, KS, etc.), important variables.

Desvio padrao da feature para olhar drift feature a feature juntamente de KS, AUC e PR-AUC

https://christophm.github.io/interpretable-ml-book/

### Model Bias and Fairness Analysis

## 💡 Interpretation and Explanability

## GHs

### Decis

### Fisher Jenks

### K-means

### GMM (Gaussian Mixed Models)

####################################################

# 5 - Regression

A regressão, por sua simplicidade, deve ser sempre a primeira escolha na hora de criar seu modelo baseline. Após um primeiro teste podemos partir para outros modelos mais robustos.

- Devemos interpretar os coeficientes e suas direções e ver se fazem sentido para o contexto estudado

- Escalar as variáveis e retreinar o modelo. Como a regressão logística é muito sensível a outliers coisas muito estranhas, como KS variando muito safra a safra ou coeficiente que esperasse ser significativo não sendo, podem ser explicados por não escalar as variáveis.

Em alguns casos ter o trabalho de escalar as variáveis pode ser em vão, como por exemplo em casos que temos padrões muito diferentes de nossas features safra a safra, com comportamentos completamente aleatórios para uma mesma variável.

Uma alternativa para a regressão linear, por exemplo, em que as variáveis não são significativas, é utilizar `GAMs` para testar se as variáveis tem uma relação não linear, de maneira simples.

## 5.1 - Machine Learning

Outra possibilidade é utilizar modelos mais robustos como por exemplo XGBoost, que nada mais é que um conjunto de árvores, com seus parâmetros bem tunados ou LightGBM que é uma versão mais rápida do XGBoost.

### Tunando parâmetros

Esse passo é essencial para encontrar qual o melhor conjunto de parâmetros para obter uma melhor performance para seu modelo

```{r eval=FALSE, include=TRUE}
tune_grid_xgb<- expand.grid(
    nrounds= c(50,100),
    eta = c(0.02, 0.01), #taxa de aprendizado, quanto menor, menor a chance de overfitting
    gamma = c(1), #quanto maior mais conservador o algoritmo [0,infinito]
    max_depth = 4:6, #profundidade da árvore(complexidade) de [0,infinito] sendo 0 sem limitação de profundidade
    min_child_weight = c(5),
    subsample= c(0.5),#proporção de subamostra de treinamento, 50% dos dados de treino serão amostrados antes da criação das arvores
    colsample_bytree=0.2 #proporção das variáveis escolhidas aleatoriamente para contruir cada árvore
  )
```

### Interpretação

Em modelos mais robustos, assim como na regressão, existe a necessidade de interpretação. Enquanto em um basta interpretar os coeficientes e observar se o sentido de cada um faz sentido para o contexto estudado, para esses modelos "Black Box" temos o SHAP(SHapley Additive exPlanations) para permitir a interpretabilidade das variáveis. Utilizando o SHAP na nossa base de treino conseguimos tirar insights sobre o que o modelo aprender com cada uma das variáveis dispostas.

Para utilizar o SHAP, caso estejamos com um modelo xgboost precisamos primeiro trasformar nossa base em uma matriz para posteriormente utilizarmos a função, como podemos ver abaixo:

```{r eval=FALSE, include=TRUE}
pred_data <- model.matrix(.outcome~., model$trainingData)[,-1]#passando uma matriz(caso o modelo seja um xgboost)
explain(model$finalModel, exact = TRUE, newdata = pred_data) %>% setDT() #função para retornar shap value, caso o modelo seja um xgboost é necessário passar uma matriz

```

Após a análise do SHAP, caso tenha muitas features, na hora de apresentar a relevância das variáveis pode ser interessante utilizar o detalhamento de Pareto para mostrar apenas os "20% de features que explicam 80% do modelo"

Além do SHAP temos outras opções como o LIME, PDP, ICE, dentre outros

# 6 - Modelagem

## Splitting

-   Dividir nossa base em treino, teste (Out of Sample) e homologação (Out Of Time)

- *Homologação (OOT):* pegamos os meses mais recentes para conseguirmos uma validação mais quente da performance do nosso modelo. A homologação só pode ser testada uma única vez, após todo o trâmite com a base de treino e teste. Utilizar a base de homologação mais de uma vez é incorreto pois você estará balizando seu resultado mais recente para definir se seu modelo está bom ou não, quando na verdade ele deve servir apenas para validar se o que foi feito com o treino e teste estava bom. Via de regra, se tudo estiver ok com o treino/teste a homologação será um reflexo disso. O que não siginifca que caso o OOT estiveja ruim, tenhamos necessariamente um problema como o modelo, pode ser que a população de treino já não é mais reflexo da população atual, ou que tenhamos uma sazonalidade no período do OOT analisado, ou que existam padrões temporais que não conseguimos captar como o modelo, ou que passou despercebido pelo analista.

Do restante da base dividimos em 2 grupos seguindo a lógico do 70/30 ou outras, como por exemplo considerar um erro fixo para treino e teste e a partir dai definir o tamanho ideal das amostras

-   *Treino:* selecionando 70% da base restante
-   *Teste:* selecionando 30% da base restante

```{r eval=FALSE, include=TRUE}
#Opção 1
split_test <- function(z = 1.96, e = 0.025, sd = 0.5){
  n_teste = ((z*sd)/e)^2
  n_teste
} #função para encontrar o tamanho da amostra de teste fixando o erro do treino e teste
#depende indiretamente do tamanho da base pois e = z*(sigma/sqrt(n))

#Opção 2
split_test <- function(base){
  n <- nrow(base) #tamanho populacao
  z <- 1.96 #z-score
  e <- 0.025#margem de erro
  sd <- 0.5 #desvio padrão

  (((z^2)*sd*(1-sd))/e^2)/1+(((z^2)*sd*(1-sd))/(e^2)/n)
}#função para encontrar o tamanho da amostra de teste fixando o erro do treino e teste

```

Após a separação das amostras devemos fazer um teste PSI (Population Stability Index) para avaliar se nossa Homologação, Treino e Teste estão semelhantes. Como no OOT não existe amostragem pode ser que ele se distingua muito da sua base de treino e teste. Bastaria fazer a comparação de Homologação com o Treino ou o Teste, porém, para uma maior certeza da aleatoriedade da função do R fazemos a comparação tanto com o Treino quanto com o Teste apenas como um double check.

Para testar o PSI podemos utilizar pacotes como `creditmodel` e `PDtoolkit`

Além do PSI é interessante fazer uma análise de drift para avaliar se features das amostras de treino, teste e homologação estão bem representadas.

Na análise exploratória deve ter observado se mês a mês as variáveis mantem um padrão de comportamento

De início, testamos um modelo mais simples para avaliar a performance do nosso baseline, em um segundo momento vale a pena compararmos a performance do Random Forest, XGboost, dentre diversos outros possíveis.

## Modeling

### Full model

Primeiro devemos transformar nosso target em fator e em seguida podemos rodar um primeiro modelo com todas as variáveis (modelo full).

Após cada passo a seguir podemos rodar um modelo para ir acompanhando a performance do modelo através do KS

Utilizamos a função abaixo para retornar um vetor com a probabilidade de cada variável ser considerada 1 no nosso target

```{r eval=FALSE, include=TRUE}
probabilities <- model %>% predict(teste, type = "response")
```

Caso possua um valor de referência para avaliar a precisão do modelo (por exemplo 0.8), o código abaixo pode ser útil

```{r eval=FALSE, include=TRUE}
### predição ----
predicted.classes <- ifelse(probabilities > 0.8, "PG", "NPG")
# precisao do modelo
mean(predicted.classes == teste$fl_good)
```

Para calcular o KS da base de treino utilizamos:

```{r eval=FALSE, include=TRUE}
### KS treino ----
setDT(treino)
treino[, fl_good := ifelse(target == "NPG", 0, 1)]#transformando seu target em numérico para medir o KS
MLmetrics::KS_Stat(y_pred = model$fitted.values, y_true = treino$target)
```

Para calcular o KS da base de teste utilizamos:
  
```{r eval=FALSE, include=TRUE}
### KS teste ----
setDT(teste)
teste[, target := ifelse(target == "NPG", 0, 1)]#transformando seu target em numérico para medir o KS
MLmetrics::KS_Stat(y_pred = probabilities, y_true = teste$target)

```

Após calcular o KS vai ser interessante olhar a curva ROC e o valor do AUC e PRAUC que seu modelo retorna.

- Vale resaltar que o AUC independe de escala pois não utiliza valores absolutos e sim a precisão das classificações
- O AUC não é uma boa métrica para se observado em uma base desbalanceada, pois como avalia apenas a taxa de verdadeiro positivo e falso positivo ela facilmente conseguirá um alto AUC caso tenha muitos TRUE e baixo caso tenha muitos FALSE
- O PRAUC é utilizado em bases desbalanceadas

Precision: $\frac{True Positive}{True Positive + False Positive}$
  Recall: $\frac{True Positive}{True Positive + False Negative}$
  
  Bases desbalanceadas facilmente conseguem um AUC alto

```{r eval=FALSE, include=TRUE}
roc1=plot.roc(treino$target,fitted(model))

plot(roc1,
     print.auc=TRUE,
     auc.polygon=TRUE,
     grud=c(0.1,0.2),
     max.auc.polygon=TRUE,
     auc.polygon.col="#ff7a00",
     print.thres=TRUE)
```

### Filtered models

#### without ZeroVar features

Em seguida podemos avaliar se temos variáveis sem variância utilizando `nearZeroVar(DT,freqCut=98/2, saveMetrics= TRUE)` e rodar um novo modelo seguindo os passos de modelagem anteriores. A cada novo passo adicione as variáveis que vão sair do seu modelo em um vetor `cols_ignore <- append(cols_ignore, rownames(var_nearzerovar)[var_nearzerovar$nzv])`

#### with little correlation

Depois de avaliar se temos variáveis sem variância podemos buscar por correlação entre as restantes com `findCorrelation(DT %>% select_if(is.numeric) %>% cor(), cutoff = .75)`

*Note que utilizamos apenas variáveis numéricas pois para outras variáveis não faz sentido olhar correlação dessa forma*

Adicione as novas variáveis no seu vetor de variáveis a serem ignoradas `cols_ignore <- append(cols_ignore, var_corr)` e rode um novo modelo para continuar acompanhando o desempenho do modelo com o `MLmetrics::KS_Stat(y_pred = probabilities, y_true = teste$target)`

#### with little VIF

Para esse passo retiramos variáveis que tenham um VIF alto, na literatura VIF \> 5 é considerado alto, porém para sermos mais conservadores podemos considerar VIF \> 10. Esse passo serve como um double-check da análise de correlação feita anteriormente, para garantir que as variáveis não estão correlacionadas, então é bem comum que nesse passo não encontre variáveis para serem retiradas caso tenha considerado um cut razoável para seu findCorrelation (\< 0.7 por exemplo)

```{r eval=FALSE, include=TRUE}
vif_model <- vif(model)
vif_model <- as.data.frame(vif(model))
cols_ignore <- append(cols_ignore, rownames(vif_model)[vif_model > 10])
```

#### Value of the Information

##### Information Value

Após os passos anteriores, rodamos um Information Value afim de observar se existe alguma relação linear univariada entre alguma feature e o target.

No caso em que você tenha muitas features e o calculo da correlação estiver demorando muito, é possível utilizar o Information Value com um valor baixo (0.02 por exemplo) antes do calculo da correlação. Mesmo que ele fará a análise univariada, e dessa forma já reduzirá dimensionalidade do seu banco total para na hora de rodar a correlação tenhamos menos variáveis e o processo seja menos custoso.

Rules related from _Siddiqi (2006)_

Not useful for prediction: _< 0.02_
Weak predictive Power: _0.02 to 0.1_
Medium predictive Power: _0.1 to 0.3_
Strong predictive Power: _0.3 to 0.5_
Suspicious Predictive Power _> 0.5_

Limitações:

- O IV assume uma relação linear entre as categorias, dessa forma caso essa relação não seja linear a importância da variável estará incorretamente calculada.
- Não considera correlação: O IV trata cada variável individualmente, não considerando possíveis iterações entre variáveis. Dessa for, não captura totalmente a complexidade a qual várias variáveis podem influenciar o resultado desejado em conjunto.
- É sensível ao número de `bins`, pois categorias com baixa volumetria podem não ser significativamente grande para termos uma proporção real de bons e maus
- É mais apropriado o uso em contextos de classificação binária

```{r eval=FALSE, include=TRUE}
IV <- Information::create_infotables(data = DT[, c(vars, 'target'), with = F], y = 'target')$Summary %>% setDT()
```

$$WOE = ln(Good Distribution / Bad Distribuition)$$

$$IV = \sum(Good Distribution - BadDistribution)*WOE$$

WOE avalia o poder de previsão de uma categoria em relação a outra. Se uma categoria apresenta um valor alto de WOE significa que a categoria distingue eficientemente os eventos dos não eventos

##### Mutual Information

Após os passos anteriores, rodamos um Mutual Information afim de observar se existe alguma relação não linear entre alguma feature e nosso target.

#### Stepwise

Utilizar caso precise avaliar o melhor conjunto de features para sua modelagem.

```{r}
RcmdrMisc::stepwise(model, direction = 'backward/forward', criterion = 'BIC')
```

#### Feature Selection Methods

Nessa etapa final de Feature Engineering podemos utilizar métodos como `Boruta`, `infgain`, `mrmr`, dentre outros, para um passo extra de seleção de features.

- *Boruta:* cria uma variável aleatória e desconsidera todas as existentes que explicarem menos que a variável aleatória gerada.
- *InfGain:* entropy of the class distribution before and after the split resultando em algo entre 0 (sem ganho) e 1 (ganho máximo)
- *mrmr:* maximum Relevancy Minimum Redundancy

- *Lasso*
  
```{r eval=FALSE, include=TRUE}
Boruta::Boruta(DT, target~.)
```


### Teste Hosmer e Lemeshow

Utilizamos o teste de Hosmer e Lemeshow (Teste Qui-quadrado) para demonstrar a qualidade do ajuste de nosso modelo de regressão logística, ou seja, se o modelo pode explicar os dados observados. A hipótese nula do teste é a de as proporções observadas e esperadas serem as mesmas ao longo da amostra (alto poder preditiva)

$$H_0$: $Prop_{o_i}$ = $Prop_{e_i}$$

```{r eval=FALSE, include=TRUE}
hl = ResourceSelection::hoslem.test(treino$target,fitted(modelo), g = 10)
```

### Matriz de Confusão

A matriz de confusão te retornará a Sensibilidade, Especificidade, dentre outros indicadores para avaliar a acertividade do seu modelo

Para a criação dessa matriz, temos que sugerir um ponto de corte, por exemplo, no caso de uma modelagem de pagamento temos que definir um ponto de corte em que dizemos se aquele cliente vai ou não nos pagar. Vimos isso no tópico de modelagem para medir a precisão do modelo. Nesse contexto agora, não temos esse valor de referência, então queremos encontrá-lo, e para isso temos algumas possibilidades:

1- Olhar o ponto de corte do KS para o score

```{r eval=FALSE, include=TRUE}
pred <- ROCR::prediction(predictions = dados_teste$pred, labels = dados_teste$true)
perf <- ROCR::performance(pred, "tpr", "fpr")
TPR <- unlist(perf@y.values)
FPR <- unlist(perf@x.values)
diff_TPRFPR <- TPR - FPR
max(diff_TPRFPR)#KS
cutoffAtKS <- unlist(perf@alpha.values)[which.max(diff_TPRFPR)][]#corte do Score
```

2 - Olhar qual ponto de corte maximiza o F1

```{r eval=FALSE, include=TRUE}

```

3 - Olhar o ponto de inflexão da curva ROC

```{r}

```


Como ambos (KS e F1) são medidas de qualidade geral do modelo, esperasse que os valores encontrados para cada um estejam próximos

## KS

Um KS muito alto é um ponto de atenção, pode ser que uma variável foi coletada incorretamente, existe alguma variável correlacionada com sua resposta, dentre outros. Por exemplo, um KS de 60 em um contexto real, utilizando uma regressão é algo para se colocar em alerta.

### KS por safra

Avaliar o KS por safras para avaliar o desempenho do seu modelo safra a safra. Caso utilize mês a mês e sua volumetria seja baixa, seu KS pode ficar bastante volátil. Uma maneira de validar essa hipótese é olhar a distribuição do KS em intervalos de tempo maiores para aumentar a volumetria, por exemplo bimestral ou semestralmente.

### Intervalo de Confiança para o KS

Rodar um bootstrap para calcular o intervalo de confiança do nosso KS. Calcular também o IC do KS safra a safra, para observarmos se os limites são respeitados.

```{r eval=FALSE, include=TRUE}
IC_KS = function(data, B, safra){
  ks_interv <- map_dbl(1:B,~{
    idx <- sample(dim(data)[1],replace = T)
    bd <- data[idx]
    ks_calc(bd[dt_ref == safra, pred],bd[dt_ref == safra, fl_good])
  }, .progress = TRUE
  )
  summary(ks_interv)
  hist(ks_interv, probability = TRUE)
  quantile(ks_interv,c(.025,.975))
}#função retorna o IC do KS do seu modelo a partir de um bootstrap
#pega a media (ou mediana por a distribuição do KS ser simétrica)

ic_ks_safra <- map_dfr(.x = seq.Date(ymd('2018-04-01'),
                                     ymd('2018-07-01'),
                                     by = 'months'),
                       .f = ~ IC_KS(safra = .x, B = 5000, data = treino)) %>% setDT()#função retorna KS safra a safra

```

### Modelo Aleatório

Pode acontecer de o modelo estar aparentemente bom, porém temos apenas uma correlação espúria entre nossas variáveis, para isso podemos utilizar um bootstrap (caso nossa amostra seja pequena) e rodar um modelo somente com intercepto e `rnorm` e avaliar o KS desse modelo safra a safra. Esse modelo necessariamente deve ser ruim, pois uma variável completamente aleatória não pode explicar bem seu modelo.

### Oversampling

Para caso de baixa volumetria, uma tentativa válida é utilizar a técnica de Oversampling para aumentar sua amostragem. (Existem muitas críticas a essa metodologia, vale a pena estudar mais sobre o assunto)

A ausência de informação também é informação. Treinar um modelo que seja desbalanceado é ser fidedígno a realidade do seu problema.

### Cross-Validate

Se estiver cogitando utilizar CV deveria responder três perguntas:

- What problem am I trying to solve by using k-fold cross validation?
- How will I know if k-fold cross validation has solved that problem?
- Will a different approach be more effective at solving my problem?

Caso algum fold tenha uma discrepância no KS é sinal que temos problemas na base. Um valor baixa de _kappa_ também é um forte indício que o modelo não está bom.

Algo interessante a se observar é a comparação entre o `model$pred` e o `predict(model, type = "prob)` quando se utiliza o método de cross-validate em seu modelo no caret. Esses valores vão ser diferentes pois com o cross-validate temos uma base de treino um pouco diferente da base original.

Caso seu modelo esteja com overfitting você terá um valor muito discrepante entre ambos, mas caso os valores estejam próximos não significa que não temos overfitting

Em um contexto geral após dividir sua base em treino e teste utiliza o CV em sua base de treino para tunar seus hiperparâmetros, de modo que internamente sua base de treino será redividida em treino e teste na proporção de `100 - (100/k-folds)` para treino e `100/k-folds` para teste `k-folds` vezes, definindo entre os `k-folds` cenários testados qual teve as melhores estimativas de desempenho com maior grau de precisão. O benefício de utilizar esse método é reduzir a variação de nossa estimativa para desempenho fora da amostra (base de treino), não de fato melhorando nosso modelo. Posteriormente ao aplicar o melhor conjunto de hiperparâmetros para nossa base de teste original não estaremos tendo um problema de overfitting, pois a nossa base de teste não foi utilizada para essa definição.

Se temos por exemplo 5 folds, a validação cruzada pelo caret irá selecionar o fold com os melhores hiperparâmetros e aplicar na base original de treino. Uma alternativa a se pensar seria utilizar como base de treino o modelo treinado pelo melhor fold, dessa forma podendo dar um perdict no que antes era sua base original de treino, utilizando o predict de teste interno dos demais 4 folds como insumo para a área ne negócio. Dessa forma seria possível dar um predict na base que originariamente era de treino para enviar a área de negócios, diferentemente de se tivessemos treinado o modelo com a base original de treino. É importante lembrar que dar um predict na abse que você utilizou para treinar seu modelo resultará em dados excessivamente otimistas que dificilmente serão generalizados para novos dados

O Nested Cross Validate é utilizado quando originalmente não é separada a base em treino e teste, pois internamente já será separada em treino, teste e validação e serão testados os hiperparâmetros da mesma forma que vimos anteriormente

```{r}
# WIP - codigo nao roda e não foi validado
set.seed(998)

folds <- createMultiFolds(iris$Species, k = 5, times = 2) ## 2 rep 5-fold CV for performance evaluation

inner_res <- trainControl(method = "cv", number = 5) ## 5-fold CV for hyperparameter tuning

mod_list <- lapply(folds, function(x) { # train models for each of the 10 training sets
  train(Species ~ ., data = iris[x,], 
        method = "rf", 
        trControl = inner_res,
        verbose = FALSE)
})

pred_list <- mapply(function(x, y) { # compute predictions on each of the 100 test sets
  predict(x, iris[-y,])}, 
  x = mod_list, y = folds)

perf_sens_spec_list <- mapply(function(x, y) { # calculate performance measures I
  confusionMatrix(x, iris[-y, "Species", drop = TRUE])$byClass[c(1,2)]}, 
  x = pred_list, y = folds)

perf_accuracy_kappa_list <- mapply(function(x, y) { # calculate performance measures II
  confusionMatrix(x, iris[-y, "Species", drop = TRUE])$overall[c(1,2)]}, 
  x = pred_list, y = folds)

# average performance across the 100 test sets
mean(perf_sens_spec_list["Sensitivity", ])
mean(perf_sens_spec_list["Specificity", ])
mean(perf_accuracy_kappa_list["Accuracy", ])
mean(perf_accuracy_kappa_list["Kappa", ])
```

### Importância e Comportamento da feature

Um ponto interessante de se observar é a importância que a feature tem no seu modelo. Quando estamos trabalhando com modelos de Machine Learning não temos de cara o valor dos nossos coeficientes como temos na regressão. Para contornar isso utilizamos a técnica de SHAP, que por meio do shapley value, permite uma interpretação do nosso modelo, retornando um coeficiente para cada feature.

```{r eval=FALSE, include=TRUE}
library(fastshap)
library(shapviz)

dados_treino1 <- model$finalModel$data
vars_model <- model$finalModel$xNames

shap <- fastshap::explain(model$finalModel, exact = TRUE, new_data = model$finalModel$xNames)

shap_plot <- shapviz(object = shap, X = dados_treino1 %>% select(all_of(vars_model)))

sv_importance(shap_plot, max_display = 10,kind = "bar", fill = "#ff7a00") +
  labs(title = "SHAP Feature Importance")
```

Além da importância conseguimos também analisar o comportamento das features

```{r eval=FALSE, include=TRUE}
sv_dependence(shap_plot, v = "vl_last_atraso")# feature única

#SHAP Beeswarm (Consistência :: Sensibility & Sanity)
sv_importance(shap_plot, kind = "beeswarm", size = 0.5) +
  labs(title = "SHAP Beeswarm")
```

Podemos analisar feature a feature com esse conjunto de 4 gráficos:

```{r eval=FALSE, include=TRUE}
# Gráficos feature_sanity() da lucyR
```

ressaltando que para variáveis contínuas o scatterplot é utilizado enquanto para variáveis discretas utilizamos o boxplot

## 6.1 Comparação de modelos

Para comparar modelos, com objetivo inferencial, podemos utilizamos o BIC, que é um critério de seleção de modelos, que penaliza a verossimilhança pelo número de parâmetros do modelo proposto. Porém em grande parte dos nosso problemas, queremos fazer previsões, por esse motivo não o utilizamos.

Bayes Factor é uma opção de critério

## Análise de Drift

### KL Divergence

Sensível a pequenas mudanças, especialmente probabilidades próximas de zero, levando a grandes flutuações pois penaliza áreas com probabilidade baixa ou próxima de zero.

Depende da sobreposição entre distribuições, ou seja, à medida que os dados de produção se afastam dos dados de referência, a falta de sobreposição aumenta a volatilidade da métrica

É altamente responsiva a outliers, pois mudanças nas caudas da distribuição podem levar a picos ou quedas repentinas nos valores, tornando-a mais instável na presença de outliers

### Wasserstein

Mede o 'custo' cumulativo para transformar uma distribuição em outra, com foco nas distâncias entre massas de probabilidade. Essa abordagem permite um tratamento mais suave de pequenas flutuações, resultando em uma métrica mais estável que o KL Divergence ao longo do tempo

AA distância de Wasserstein é independente de sobreposição e pode lidar muito bem com mudanças significativas de distribuição em forma ou localização

### PSI

### KS

# 7 - Grupos Homogêneos

Com a modelagem finalizada, ou pelo menos uma V0, é preciso agrupar seus resultados por grupos homogêneos (GHs). A ideia de criar grupos homogêneos é observar o desempenho do modelo para cada grupo, ao invés de olhar o seu desempenho geral. Pode acontecer de no geral o modelo estar bem preditivo, porém ao quebrar em grupos observamos que determinados grupos estão subindo a média de nossa preditividade, enquanto outros estão pouquíssimo preditivos.

Para a criação dos GHs podemos utilizar a função `classInt::classIntervals` para encontrar o melhor ponto de corte

```{r eval=FALSE, include=TRUE}
# função para gerar GHs usando y_pred, y_true e número de bins (pode ser otimizado)
```

É preciso testar diferentes combinações de bins para encontrar a melhor partição para os grupos homogêneos, uma vez que a alteração dos bins máximos e mínimos impacta na função.

## 7.1 - Matriz de confusão

Podemos ao invés de comparar os modelos, pode ser o caso de termos modelos complementares, dessa forma a comparação se torna um pouco mais difícil, como é o exemplo da criação de um modelo específico de fim de mês e outro para meio de mês. Nesse caso, se torna interessante avaliar o quão acertívo ambos os modelos são, para isso pegamos uma mesma base de dados (por exemplo a base do meio de mês) e fazemos uma matriz de confusão para ambos, utilizando o melhor ponto de corte para ser utilizado para

## Teste de Proporção com correção de Bonferroni

Após agrupar sua base por GH, criando uma coluna com a soma do seu target e a quantidade de observações por grupo, rodamos o teste de Bonferroni.

```{r eval=FALSE, include=TRUE}
pairwise.prop.test(x=teste$soma_target,
                   n=teste$N_grupo,
                   p.adjust.method = "bonferroni",
                   alternative = "two.sided",
                   correct = FALSE)
```

O teste de proporção com ajuste de Bonferroni, feito pela função acima, multiplica o p-valor encontrado pelo número de grupos, não sendo necessário utilizar a correção de $\frac{\alpha}{m}$ manualmente para avaliar o p-valor, em que $H_0$ seria os grupos serem iguais, desse modo p-valor < 0.05 significa não ter diferença significativa entre as comparações múltiplas.

Vale ressaltar que o teste acima faz a comparação múltipla de todos os grupos, podendo estar superestimando os p-valores, para o caso de GHs é interessante colocar o `p.adjust.method` como `none` e fazer a correção manualmente multiplicando o p-valor pela quantidade de comparações (quantidade de grupos - 1) pois dessa forma teremos para a comparação de A, B, C e D apenas A -> B, B -> C, C -> D.

# 8 - Atualização do Modelo

A ideia é entregar um modelo rápido, para podermos aprender com ele e gerar valor o mais rápido possível. Após a primeira entrega ser feita, não devemos nos contentar com os resultados, pelo contrário, como já temos uma entrega devemos buscar por melhorias no modelo que antes não eram possíveis devido a necessidade de tempo junto a necessidade da entrega.

# 9 - Pontos de atenção aos resultados

Entender o quão preditivo está meu modelo. Acertar muito em públicos óbvios e pouco em públicos mais complexos com um ks de 90 é pior do que acertar razoável em públicos mais complexos e ks de 40

Como medir objetivamente se a resposta do meu modelo está de fato agregando, além de olhar valor do KS?
  
  Comparar o modelo antigo (se existir) com o modelo novo, utilizando a mesma base para efeito de comparação

Mudar a visão de sua modelagem pode ser uma saída viável, caso esteja estagnado em sua modelagem. Uma nova abordagem, como por exemplo modelar por contrato ao invés de cpf, buscar features de outros lugares, tentar uma régra de negócios ao invés de uma modelagem mais robusta, etc, podem ser boas alternativas.

# 10 - Pós modelagem

Com o modelo pronto o próximo passo é o deploy, que pode ocorrer de forma automática ou manual, o "manuático" consiste em um código com apenas o necesário para conseguir rodar o modelo manualmente de acordo com a demanda. Feito isso, existem algum caminhos a se seguir, seu modelo pode subir para produção ou passar por uma experimentação por exemplo. No caso do experimento pode ser necessário um direcionamento ao cliente para que seja feito de forma correta, evitando inconsistências futuras.

A `calibração de modelo` consiste em um conjunto de análises, compostos por `Diagnóstico` e `Remediação` para avaliar as probabilidades retornadas pelo modelo. O objetivo da calibração do modelo é garantir que as probabilidades de classe estimadas sejam consistentes com o que ocorreria naturalmente. (No caso de estimativas pontuais PODE fazer sentido essa abordagem, porém ao criar os GHs temos uma mitigação do erro a partir da predição intervalar de cada grupo com bootstrap para avaliar o intervalo de 95%)

https://medium.com/data-hackers/calibrando-modelos-de-classifica%C3%A7%C3%A3o-bin%C3%A1ria-com-previs%C3%A3o-conforme-f547e68602ee

# 11 - Modelo não supervisionado

Para modelos não supervisionados não temos um target pré-definido para podermos utilizar de insumo para nossa modelagem, dessa forma temos que utilizar de outras técnicas para chegarmos em resultados satisfatórios.

## O que queremos modelar?

## É possível obter uma proxy do que esperamos ao final da modelagem?

Esse é um tópico sensível pois exige bastante conhecimento acerca de nosso problema, além de termos que nos atentar a viéses para nossa modelagem, caso tenhamos alguma ideia a priori do que fazer.


Devemos seguir com o monitoramento afim de garantirmos a funcionalidade/eficácia do mesmo. 
