## SELECT Functions

```sql
SELECT REPEAT(str, n)::TEXT --repete n vezes a str e garante que retorne em formato de string
```

## Metadados Google Cloud

Lista todos os metadados referentes às queries executadas

```sql
SELECT *
FROM `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE
  DATE(creation_time) = CURRENT_DATE() - INTERVAL 1 DAY
  AND job_type = 'QUERY'
  AND statement_time = 'SELECT'
  AND user_email = 'seu_email@dominio.com'
```

## Window Function

Cria a janela uma única vez e a chama para não poluir o código
```sql
SELECT
  t.*,
  AVG(vl_transacao) OVER w AS mean_7d,
  COUNT(*) OVER w AS cnt_7d
FROM `projeto.dataset.sua_tabela_amostrada` t
WINDOW w AS (
  PARTITION BY key1
  ORDER BY UNIX_SECONDS(timestamp_col)
  RANGE BETWEEN 604800 PRECEDING AND CURRENT ROW
),

WINDOW w2 AS (
  PARTITION BY key1, key2
  ORDER BY UNIX_SECONDS(timestamp_col)
  RANGE BETWEEN 604800 PRECEDING AND CURRENT ROW
),
```

## Percentile

```sql
APPROX_QUANTILES(vl_transacao, 100)[OFFSET(25)]
APPROX_QUANTILES(vl_transacao, 100)[SAFE_OFFSET(25)] -- Evita erro quando a janela tem poucas observações (ex.: primeira transação do cartão). Em vez de quebrar, retorna NULL.

```

## Criar tabela

O comando `CREATE TABLE` sozinho irá criar a tabela uma única vez, não permitindo rodar o comando novamente, para sobrescrever a tabela é necessário utilizar o comando `REPLACE TABLE`

```sql
CREATE OR REPLACE TABLE projeto.dados.tabela (
    id INT64,
    nm_nome STRING,
    dt_ref DATE,
    dttm_ref DATETIME,
    vl_valor FLOAT64,
    vl_valor2 NUMERIC
)
PARTITION BY dt_ref
CLUSTER BY nm_nome, id --até 4
OPTIONS(
    description="Tabela de exemplo", -- Descrição da tabela
    expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 365 DAY) -- Tempo de expiração da tabela
) AS
SELECT * FROM tb
```

## Inserir na tabela

Já tendo uma tabela criada é possível inserir informações, de forma empilhada com o comando `INSERT INTO`

```sql
INSERT INTO projeto.dados.tabela
SELECT * FROM tb
```

## Deletar na tabela

Caso queira deletar sua tabela, ou parte dela, basta utilizar o comando `DELETE` ou `DROP`. Se adicionar a cláusula `WHERE` apenas o que estiver no filtro será deletado. Pode-se adicionar o comando IF EXISTS para evitar erros caso a tabela não exista/já tenha sido deletada.

```sql
DELETE FROM projeto.dados.tabela
WHERE dt_ref > '2025-01-01'
```

```sql
DROP TABLE IF EXISTS projeto.dados.tabela
```

## Uso do LIMIT

`LIMIT` é um filtro de saída, que é aplicado apenas APÓS a consulta ser processada, desse modo o custo da consulta não é reduzido, pois toda a tabela é lida (Full Scan) para depois limitar o número de linhas que irão aparecer. Serão retornadas as X primeiras linhas da tabela, de forma ordenada, não aleatória.

```sql
SELECT *
FROM projeto.dados.tabela
LIMIT 100
```

## Uso do TABLESAMPLE

`TABELSAMPLE` é uma amostragem de leitura, que atua DURANTE a leitura dos dados, desse modo a função instrui o banco de dados a ler apenas uma porcentagem aleatória dos blocos de dados (partições físicas) que compõem a tabela. Reduz o custo pois apenas é cobrado pelos dados lidos.

O uso do `SYSTEM` especifica o método de amostragem que o banco de dados deve utilizar. Ela indica que a seleção não será feita linha a linha, mas baseada na infraestrutura física onde os dados estão armazenados, permitindo que o BigQuery ignore fisicamente os blocos que não foram sorteados pela amostragem. Por a amostragem ser baseada no tamanho dos blocos e não na contagem de linhas pedir 10% da base pode retornar valores próximos como 9.8% ou 10.2%

```sql
SELECT *
FROM projeto.dados.tabela
TABLESAMPLE SYSTEM (1 PERCENT)
```
