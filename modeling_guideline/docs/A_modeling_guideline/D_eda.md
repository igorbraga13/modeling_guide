## Univariate Analysis

## Bivariate Analysis

## Multivariate Analysis

## Data Quality Checks

## Document and Share Insights


##################

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