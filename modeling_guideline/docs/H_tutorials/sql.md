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

Caso queira deletar sua tabela, ou parte dela, basta utilizar o comando `DELETE`. Se adicionar a cláusula `WHERE` apenas o que estiver no filtro será deletado.

````sql
DELETE FROM projeto.dados.tabela
WHERE dt_ref > '2025-01-01'
```