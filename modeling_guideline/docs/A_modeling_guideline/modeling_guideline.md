# Introduction

Antes de iniciar esse direcionamento para Modelagem, lembre-se que todo modelo é fruto de um trabalho artesanal, e esse material é meramente um pilar para sua obra...

Após cada passo valide seu trabalho, caso não consiga validar todos, ao menos 10 casos para ter alguma ideia se o que está fazendo está caminhando da forma esperada.

O conteúdo desse material foi desenvolvido pensando principalmente em modelos supervisionados, tendo espaço para alguns insights sobre modelos não supervisionados.

É importante lembrarmos que independente do algoritmo que utilizarmos posteriormente, o maior ganho que teremos será durante os primeiros passos da modelagem:

- na definição de um target aderente ao problema que queremos solucionar
- na definição de público elegível fiel ao nosso contexto real
- na criação de features que, em conjunto, possam explicar melhor nosso modelo
- na seleção das melhores features para nosso contexto
- em métodos eficazes e entendimento do negócio para definir o período a ser considerado na amostragem

A utilização de algoritmos de ponta não será nosso 'game change', ele pode nos garantir aquele ponto de métrica a mais em nosso modelo, mas não será o protagonista da modelagem.

# 0 - Entendimento do Problema

Antes de mais nada entenda seu problema e a necessidade da criação de um modelo ou regra de negócio. Pode ser que seja necessário um modelo mais simples, que fique pronto em um menor tempo para gerar valor de forma mais rápida, ou pode ser necessário um modelo mais complexo, que irá demandar um tempo maior. Pode ser também que para o problema não seja necessário um modelo, e sim um conjunto de regras de negócio a ser aplicado.

# 1 - Definição do Target

Nesse momento, juntamente com a área de negócios temos que definir nosso objeto de estudo, juntamente com o que queremos modelar (target).

Para a definição do target devemos ter um tempo de observabilidade à frente, a partir da nossa data de referência, para avaliar o comportamento desses clientes que serão utilizados para fomentar nosso modelo. No caso de trabalhar com modelos de target binário a definição de marcação a partir do EVER ou OVER vai depender da estratégia buscada. 

## Ever ou Over? Qual escolher?

O EVER será mais conservador, enquanto o OVER será mais liberal. No caso do EVER, o cliente que atrasa ee paga o juros, voltando a ficar adimplente é considerado ruim, pois olhamos os atrasos até a janela final, enquanto para o OVER o cliente que atrasa e volta a pagar antes do final da janela é considerado como bom pois olhamos apenas o retrato do final da janela. Para definir se será usado um ou outro pode depender da forma que as bases da instituição são construídas, por exemplo: clientes que renegociam contratos aparecem com novo contrato sem atraso, se olharmos o EVER teremos o atraso intramês do cliente, enquanto se olharmos o OVER não teremos a informação que ele atrasou e vamos considerá-lo bom.


### Ever

```{r eval=FALSE, include=TRUE}
DT[, mob := min_dt_ref %--% dt_ref %/% months(1)] #define os mobs (a dt_ref minima pode ser a data de ativacao por exemplo no contexto de onboarding)

DT <-  DT[mob >= 0 & mob <= 6 | is.na(mob)] #definido mob 6 caso se trate de um target ever60mob6, sendo essa a data máxima avaliada. O NA está incluso em casos que não temos ativacao por exemplo ou clientes que não estão na nossa tabela do CADOC

DT_perf <- DT[, .(fl_default = max(as.integer(atraso >= 60)), ##flaga todos os meses em atraso ou não atraso e soma, caso o máximo seja 0 não temos default no intervalo
             mob_default = min(mob[atraso>=60]), #conta o número de mobs, com o mínimo temos o mês em que o default ocorreu
             qtd_meses_materialidade = sum(saldo_devedor>50)), # números de meses que temos materialidade 
            .(cpf_cnpj, safra, qtd_mob)]
```

### Over

```{r eval=FALSE, include=TRUE}
DT[, mob := min_dt_ref %--% dt_ref %/% months(1)] #define os mobs (a dt_ref minima pode ser a data de ativacao por exemplo no contexto de onboarding)

DT <-  DT[mob >= 0 & mob <= 6 | is.na(mob)] #definido mob 6 caso se trate de um target ever60mob6, sendo essa a data máxima avaliada. O NA está incluso em casos que não temos ativacao por exemplo ou clientes que não estão na nossa tabela do CADOC

DT_perf <- DT[, .(fl_default = max(as.integer(atraso >= 60)), ##flaga todos os meses em atraso ou não atraso e soma, caso o máximo seja 0 não temos default no intervalo
             mob_default = min(mob[atraso>=60]), #conta o número de mobs, com o mínimo temos o mês em que o default ocorreu
             qtd_meses_materialidade = sum(saldo_devedor>50)), # números de meses que temos materialidade 
            .(cpf_cnpj, safra, qtd_mob)]
```


## Definição de bases

Após o target definido, deve ser feito um levantamento das bases que podem ser utilizadas para melhor explicar nosso target

- Dados internos
- Dados externos como SCR, Bureaus (Serasa, Quod, Boa vista, Belvo, Neurotech)

# 2 - Build Features

*A depender de cada caso a criação de features pode ser antes ou depois da definição do público elegível*

A partir do target definido, todo o escopo do projeto entendido, partimos para a criação das features

Para criarmos as features temos que nos atentar ao horizonte de feature que vamos utilizar. Podemos utilizar 3 meses de features, dessa forma pegamos a partir de uma data de referência, os três meses anteriores para montar nossas features.

-   Uma opção é juntar todas as bases cruas que serão utilizadas e posteriormente criar nossas features para evitar retrabalho e como melhor prática
-   Outra opção é criar as features para cada base separadamente pois dessa maneira é mais fácil identificar possíveis problemas nas bases ou features criadas, essa opção se torna viável quando não se tem domínio ou confiança suficiente sobre determinada base

Podemos criar features utilizando diferentes horizontes de tempo para os clientes, porém, para isso devemos ter alguma forma de identificar os clientes em que nosso tempo de features varia. Por exemplo: Se quisermos pegar como features o histórico de atraso de um cliente, devemos ter também uma feature com o tempo de contrato desse cliente, pois é muito diferente um cliente que atrasou 2 parcelas em 2 meses com um cliente que atrasou 2 parcelas em 10 anos

## 2.1 Público Elegível

Avaliando, dentre toda nossa base, os clientes que possuem o horizonte definido de features, e as demais premissas necessárias (hard filters, tempo de observabilidade para o target, etc), estes tornam-se nosso público elegível

Tendo a base de features para o público elegível devemos validá-la, para isso uma opção pode ser dividir sua base por meses e avaliar a volumetria por safra, aquelas que aparentarem inconsistentes, podemos dar um double check com uma query na determinada data, por exemplo.

É importante que a medida que seu público elegível vai se afunilando, você reporte os valores retirados em cada passo.

Para a definição do público elegível uma forma de tentar garantir a independência da sua base é amostrando seu público. Quando você está em uma situação em que não possui safra, ou seja, o mesmo cliente pode aparecer diversas vezes (collection, behavior, pre-creli) podemos criar janelas em que a mesma observação não possa aparecer até o fim dessa janela, essa opção permite ainda amostrar dentro de cada mês para evitar que grande parte do público apareça no primeiro mês e só possa aparecer novamente na próxima janela. Permitindo uma "melhor aleatorização" da nossa base.

```{r eval=FALSE, include=TRUE}
DT_unique <- unique(DT[atraso %in% (30:60)][order(dt_ref)])#aqui temos o público elegível que no caso são clientes com atraso entre 30 e 60
# Fazer a amostragem ------------------------------------------------------

data <- unique(DT_unique$dt_ref)
data <- data[order(data)]

set.seed(090815)
all_obs <- DT_unique[dt_ref == data[length(data)],
                     slice_sample(.SD, n = min(.N, 150))
] #pega ultimo mes disponível

# Cria a amostragem para os outros meses
for ( i in (length(data)-1):1){
  contrato_excluidos <- all_obs[dt_ref > data[i] & dt_ref < data[i] %m+% months(X), cd_contrato] 
  temp <- base_3040_unique[dt_ref == data[i] & !cd_contrato %in% contrato_excluidos,
                           slice_sample(.SD, n = min(.N, 150))
                           ]
  all_obs <- rbind(all_obs,temp)

}#criamos uma janela do dia mais recente e pegando os meses anteriores respeitando nossa janela de X meses
```

Se em nossa situação tivermos a safra do cliente (application, onboarding, acesso direto) basta encontrar uma forma de amostrar esses clientes olhando a safra de cada um e o número de meses pra frente (para olhar o target) e para trás (para olhar as features) 

```{r eval=FALSE, include=TRUE}

```


# 3 - Análise exploratória univariada das variáveis de interesse (features inclusas)

Nesse momento a análise tem como objetivo encontrar outliers, semelhanças na distribuição das features, etc

-   Um ponto de atenção são as features com variabilidade próxima de 0, que talvez devam ser manipuladas ou até excluídas.
-   Remoção de features altamente correlacionadas
-   Se o objetivo for a estimação utilizamos a base full, caso seu objetivo seja de predição dividimos a base
  -   Esse passo pode também acontecer após a análise bivariada, afim de conhecer melhor a base com features não significativas.
-   Para evitar outliers, uma opção seria fixar os valores máximos e mínimos das features a partir dos percentis (alpha)% e (100-alpha)% por exemplo (outras ações podem ser tomadas, não existe fórmula mágica)

Para sermos mais conservadores em relação ao outliers podemos considerar `Outlier extremo`: Considerar valores menores que (Q1 - 3\*dist AIQ) e maiores que (Q3 + 3\*dist AIQ)

# 4 - Análises bivariadas para validação das features (pode-se utilizar decision tree)

Nesse momento a análise tem como objetivo observar se alguma feature vai de desencontro com nosso target, deixando um ponto de atenção.

É importante lembrar que na análise exploratória bivariada, comparando as features com o target, estamos cruzando as informações das features com horizonte de X meses para trás, com o target definido com informações X meses a frente.

Nessa análise é interessante observar se a distribuição das nossas variáveis é uniforme ao longo do tempo, para isso pode ser feita uma análise de drift mês a mês tanto utilizando PSI quanto Wasserstein. Uma outra maneira é pegar algumas estatísticas(média, mediana...) das variáveis e observar se elas variam muito mês a mês ou fazer um teste `ks.test` para avaliar se ambas as amostras vem de uma mesma distribuição.

Caso encontre uma aleatoriedade nas variáveis mês a mês, dessa forma é preciso tentar entender o porque de nossa população mudar tanto a cada safra. Vale uma reflexão de caso houver uma criação de janela para tentar garantir uma independência entre as observações que queremos coletar (exemplo: criamos janelas com espaçamento de 6 meses em que o cliente só pode aparecer novamente no início da próxima janela para tentar garantir a independência das observações que queremos coletar): Se criamos uma janela, o comportamento das nossas variáveis pode não ficar bem representado safra a safra, dessa forma pode ser interessante reamostrar a base

Essa análise safra a safra pode também ser feita na base de Treino, logo após a separação da base entre `treino`, `teste (Out of Sample)` e `homologação (Out of Time)`, nesse caso olhamos primeiro a base de treino

Na análise exploratória deve ter observado se mês a mês as variáveis mantem um padrão de comportamento

```{r eval=FALSE, include=TRUE}
#observando a média
dist_variaveis <- DT %>% melt(id.vars = "dt_ref") %>%
  .[, mean(value), .(dt_ref, variable)] %>%
  dcast(dt_ref ~ variable)
```

O KS é sensível ao tamanho de sua amostra, então amostras muito grandes rejeitam a hipótese de igualdade entre a distribuição das variáveis mais facilmente

```{r eval=FALSE, include=TRUE}
#KS
feats <- c(names(model$finalModel$coefficients)[-1])
drift <- dados_treino %>% dplyr::select(all_of(feats))

drift[,data_m0:=dados_treino$dt_mod]

ks_stat_drift <- function(m0, var, d){
  cat(as.character(m0), ":: ", var,"\n")
  m0 <- ymd(floor_date(m0, unit = "month"))
  mm1 <- m0 %m-% months(1)
  dm1 <- d[floor_date(data_m0, unit = "month") == ymd(mm1), var,with=F] %>% as.data.frame() # == para estático e <= para acumulado
  d0 <- d[floor_date(data_m0, unit = "month") == m0, var, with=F] %>% as.data.frame()
  #print(paste(m0,'|',var))
  ks <- ks.test(dm1[,1],d0[,1])
  z <- t.test(dm1[,1],d0[,1])
  return(list(var=var,
              m0=m0,
              ks_stat=ks$statistic,
              ks_p_val=ks$`p.value`,
              t=z$statistic,
              t_p=z$`p.value`))
}
```

Para diferenciar a métrica estática da acumulada safra a safra, opta-se por utilizar `dm1` e `d0` com sinais, `==` para observar a relação entre o mês e o anterior ou `<=` para observar a relação entre o mês com o acumulado dos demais meses.

O Wasserstein mede o trabalho necessário para transformar uma distribuição em outra a partir dos valores reais das variáveis, que podem variar muito e, consequentemente, deixar sua escala muito grande, por essa razão para utilizar o Wasserstein é necessário escalar as features. O problema do Wasserstein se deve a falta de noção relacionado ao valor da escala, não é possível saber se em uma escala que varia de 1 a 5, o valor 1 é bom ou tudo de 1 a 5 é ruim, por exemplo.

```{r eval=FALSE, include=TRUE}
#Wasserstein
feats <- c(names(model$finalModel$coefficients)[-1])
drift <- dados_treino %>% dplyr::select(all_of(feats))

drift[,data_m0:=dados_treino$dt_mod]

wasser_stat_drift <- function(m0,var,d){
  m0 <- ymd(floor_date(m0, unit = "month"))
  mm1 <- m0 %m-%months(1)
  dm1 <- d[floor_date(data_m0, unit = "month") == ymd(mm1), var, with=F] %>% as.data.frame() # == ou <=
  d0 <- d[floor_date(data_m0, unit = "month") == m0, var, with=F]%>% as.data.frame() # == ou <=
  print(paste(m0,'|',var))
  w <- wasserstein1d(dm1[,1],d0[,1],p=1)
  #z <- t.test(dm1[,1],d0[,1])
  return(data.frame(var=var,
                    m0=m0,
                    wasser=w
                    #ks_p_val=ks$`p.value`,t=z$statistic,
                    #t_p=z$`p.value`)
  ))
}

feats <- append(feats, "data_m0")
dados <- base %>% dplyr::select(all_of(feats)) %>% mutate_if(is.numeric, scale) 

```

O PSI assim como o Wasserstein não é sensível ao tamanho da amostra, porém em seu processo são separadas as variáveis em grupos e comparados, dessa forma o PSI é sensível ao número de bins (grupos)

```{r eval=FALSE, include=TRUE}
#PSI
feats <- mf2$feature_names

drift <- treino3 %>% select(any_of(feats))

drift[,data_m0:=treino3$data_m0]
drift[,m0:=NULL]

ks_stat_drift <- function(m0,var,d){
  m0 <- ymd(floor_date(m0, unit = "month"))
  mm1 <- m0 %m-% months(1)
  dm1 <- d[floor_date(data_m0, unit = "month") <= mm1,var,with=F] %>% as.data.frame()
  d0 <- d[floor_date(data_m0, unit = "month") == m0,var,with=F]%>% as.data.frame()
  #print(paste(m0,'|',var))
  ks <- ks.test(dm1[,1],d0[,1])
  z <- t.test(dm1[,1],d0[,1])
  dm1$m <- mm1
  d0$m <- m0
  psi <- get_psi(dat=rbind(dm1,d0),occur_time='m')
  return(data.frame(var=var,m0=m0,ks_stat=ks$statistic,ks_p_val=ks$`p.value`,t=z$statistic,
         t_p=z$`p.value`,psi=psi[,unique(PSI)]))
  
}
```

Após escolher qual função utilizar é necessário rodar o `map` e posteriormente o ggplot caso queira visualizar o gráfico do drift

```{r eval=FALSE, include=TRUE}
x <- map2_dfr(.x = rep(seq.Date(ymd('2018-05-01'), #primeiro mes da sua base +1
                                ymd('2022-06-01'), #último mes da sua base
                                by = 'month'),
                       each = 17), #quantidade de variáveis
              .y = rep(names(drift), 50), #quantidade de meses entre o início e fim das datas
              .f = ~ ks_stat_drift(.x, .y, base)) %>% setDT()

x[, sig:=as.integer(ks_p_val<=0.05)]

x2 <- data.table::dcast(x,var~m0,value.var = 'ks_stat')

#função para plotar o gráfico
ggplot(x,aes(x=m0,y=var,fill=ks_stat))+
  geom_tile(width=50,col='white')+
  scale_x_date(date_labels = "%m/%Y",date_breaks = "29 day",expand = c(0,0))+
  # scale_x_date(expand = c(0,0))+
  labs(x="",y="",title = "Drift ao longo do tempo - Wasserstein mês anterior",
       fill = "")+
  theme_minimal()+
  scale_fill_distiller(type='div')+
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
```


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
    inter.ai::ks_calc(bd[dt_ref == safra, pred],bd[dt_ref == safra, fl_good])
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
lucyR::feature_sanity()
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

Para a criação dos GHs utilizamos a função `grupos_risco` do pacote `inter.ai`, que utiliza a função `classInt::classIntervals` para encontrar o melhor ponto de corte

```{r eval=FALSE, include=TRUE}
inter.ai::gerar_grupos_homogeneos(y_true, y_pred, try_bins = 4:20)
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

# 11 - Modelo não supervisionado

Para modelos não supervisionados não temos um target pré-definido para podermos utilizar de insumo para nossa modelagem, dessa forma temos que utilizar de outras técnicas para chegarmos em resultados satisfatórios.

## O que queremos modelar?

## É possível obter uma proxy do que esperamos ao final da modelagem?

Esse é um tópico sensível pois exige bastante conhecimento acerca de nosso problema, além de termos que nos atentar a viéses para nossa modelagem, caso tenhamos alguma ideia a priori do que fazer.


Devemos seguir com o monitoramento afim de garantirmos a funcionalidade/eficácia do mesmo. 

# 12 - Algorithms

## Supervised

### Regressão 

#### Regressão Linear

#### Regressão Logistica

### Cubist Regression

Modelo de regressão que utiliza recortes simples de árvores de decisão e cria modelos de regressão dentro cada regra

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

Geralmente utilizado em contextos de classificação, encontra um hiperplano (podendo ser uma linha) para segregar categorias

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



# 12 - Model Monitoring

Quando temos um modelo em produção, seja online ou em batch devemos fazer seu monitoramento afim de garantirmos a funcionalidade/eficácia do mesmo. Podemos utilizar como material de consulta o `Working Paper No. 14`

## 12.1

O que?
  - Consistência no resultado do modelo
Como?
  - Taxa de aprovações estável, conversando com a taxa esperada do modelo

## 12.2

O que?
  - Comportamento dos grupos se manteve?
  Como?
  - Taxa de aprovações x taxa de bads dos GHs

## 12.3

O que?
  - Continuamos tratando da mesma população de quando treinamos?
  Como?
  - Observar o drift das features e seu descolocamento em função da média

## 12.4

O que?
  - Avaliação da qualidade do ajuste do modelo. (O modelo ainda pode explicar os dados observados?)
Como?
  - Teste de Hosmer e Lemeshow para avaliar se as proporções observadas e esperadas são as mesmas ao longo da amostra


## 13 - Append

## Mathematical definitions in data science

### Gradient Descent

$$\theta_{j+1} = \theta_{j} - \alpha \nabla J(\theta_{j})$$ \### Normal Distribution

$$f(x|\mu,\sigma^2) = \frac{1}{\sigma\sqrt{2\pi}}exp(- \frac{(x-\mu)^2}{2\sigma^2})$$

### Z-score

$$z = \frac{x-\mu}{\sigma}$$

### Sigmoid

$$\theta(x) = \frac{1}{1+e^{-x}}$$

### Correlation

$$Correlation = \frac{Cov(X,Y)}{Std(X) \dot{} Std(Y)}$$

### Cosine Similarity

$$Similarity = \frac{A \dot{} B}{||A|| \dot{} ||B||}$$

Avi Chawla Save posts
orrelation = \frac{Cov(X,Y)}{Std(X) \dot{} Std(Y)}$$

### Cosine Similarity

$$Similarity = \frac{A \dot{} B}{||A|| \dot{} ||B||}$$

Avi Chawla Save posts