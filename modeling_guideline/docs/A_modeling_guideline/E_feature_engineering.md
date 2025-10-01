# 2 - Build Features

*A depender de cada caso a criação de features pode ser antes ou depois da definição do público elegível*

A partir do target definido, todo o escopo do projeto entendido, partimos para a criação das features

Para criarmos as features temos que nos atentar ao horizonte de feature que vamos utilizar. Podemos utilizar 3 meses de features, dessa forma pegamos a partir de uma data de referência, os três meses anteriores para montar nossas features.

-   Uma opção é juntar todas as bases cruas que serão utilizadas e posteriormente criar nossas features para evitar retrabalho e como melhor prática
-   Outra opção é criar as features para cada base separadamente pois dessa maneira é mais fácil identificar possíveis problemas nas bases ou features criadas, essa opção se torna viável quando não se tem domínio ou confiança suficiente sobre determinada base

Podemos criar features utilizando diferentes horizontes de tempo para os clientes, porém, para isso devemos ter alguma forma de identificar os clientes em que nosso tempo de features varia. Por exemplo: Se quisermos pegar como features o histórico de atraso de um cliente, devemos ter também uma feature com o tempo de contrato desse cliente, pois é muito diferente um cliente que atrasou 2 parcelas em 2 meses com um cliente que atrasou 2 parcelas em 10 anos


## Feature Engineering
target encoding [CatBoost Encoder](contrib.scikit-learn.org/category_encoders/catbooost.html)
