# FPD (FIrst Payment Default)

O FPD é um <span style="color:#ff7a00">balizador rápido de decisão</span>, observamos a primeira parcela em atraso por fatura, ou simplesmente a primeira fatura em atraso, isso quer dizer que independentemente se o valor foi total ou parcialmente pago ele não se configura como FPD. Para avaliarmos os clientes em FPD consideramos apenas quem esteja com atraso a partir de 30 dias após a data de sua fatura, para assim não contabilizarmos os clientes que por alguma razão atrasaram a conta em alguns dias.

                                          ❓Pagou?
                                              ↓
                                        ↙           ↘
                                ✅ Sim                 ❌ Não
                                ↙      ↘                   ↓
                             Total    Parcial              FPD

|Concessão|Primeira Compra|Corte|Vencimento|D+1|D+30|Creli|
|---------|---------------|-----|----------|---|----|-----|
|cliente solicita crédito|cliente utiliza o crédito (M0)|Data de fechamento da fatura|Data de vencimento da fatura|Primeiro dia de atraso da fatura|30 dias de atraso da fatura|Clientes com mais de 65 dias de atraso

## Por que a avaliação ocorre em M2?

A avaliação é feita em M2 pois no mês da primeira utilização (M0) temos que esperar 30 dias para o fechamento da fatura (que acontecerá em M1), então apenas em M2 teremos os 30 dias de atraso do cliente de M0

|M0|->|M1|->|M2|
|--|--|--|--|--|
|Mês da primeira compra|fechamento da fatura|Mês subsequente a primeira compra (1o vencimento)|30 dias de atraso|Segundo mês após a primeira compra

## Como calcular o FPD?

Apenas avaliamos os clientes que o mês da concessão coincida com o mês da primeira utilização (M0), pois como o FPD é uma análise de safra, um cliente que teve a primeira utilização apenas 1 ano depois de sua concessão, deve ser enquadrar na análise da sua respectiva safra, sendo esse um cliente elegível

### FPD financeira
Chamamos de FPD financeiro o percentual do valor da carteira com atraso superior ou igual a 30 dias dentro do universo de clientes elegíveis

1. Somar todo o saldo devedor (**Saldo devedor total**)
2. Somar apenas o saldo devedor a partir de 30 dias de atraso (**Saldo devedor em atraso**)
3. Dividir o saldo devedor em atraso pelo saldo devedor (**FPD**)

#### Exemplo

|cliente|saldo devedor |atraso|
|-------|--------------|------|
|XXX.XXX.XXX-XX|1000,00|15    |
|XXX.XXX.XXX-XX|500,00 |30    |
|XXX.XXX.XXX-XX|20,00  |70    |

$1000 + 50 + 20 + 1070$

$50 + 20 = 70$

$70/1070 = 0.654$

Dizemos então que a FPD está em 6,5%

Vale observar que existia um saldo devedor de R$1000,00 com 15 dias de atraso e não entrou no cálculo da FPD pois não tinha o mínimo de 30 dias de atraso

```r
DT[, sum(saldo_devedor[atraso >= 30])/sum(saldo_devedor)]
```

### FPD físico

Chamamos de FPD físico o percentual de clientes com atraso superior ou igual a 30 dias dentro do universo de clientes elegíveis

1. Somar todos os clientes elegíveis com saldo devedor (**Saldo devedor total**)
2. Contabilizar apenas os clientes com saldo devedor a partir de 30 dias de atraso, que sejam elegíveis (**Saldo devedor em atraso**)
3. Dividir os clientes com saldo devedor em atraso pelo número total de clientes (**FPD**)

#### Exemplo

|cliente|saldo devedor |atraso|fl_elegivel|
|-------|--------------|------|-----------|
|XXX.XXX.XXX-XX|1000,00|15    |1          |
|XXX.XXX.XXX-XX|0,00   |30    |0          |
|XXX.XXX.XXX-XX|20,00  |70    |1          |

Clientes com mais de, ou igual a, 30 dias de atraso: 1

Clientes elegíveis: 2

1/2 = 0,5

Dizemos então que a FPD está em 50%

Vale observar que existia um cliente com 15 dias de atraso e não entrou no cálculo da FPD pois não tinha o mínimo de 30 dias de atraso e o outro cliente que possuía 40 dias de atraso não entrou na conta pois não era elegível (não utilizou o limite ativado no mês da concessão)

```r
DT[, .(fpd = sum(fl_elegivel*(atraso >= 30))/sum(fl_elegivel))]
```