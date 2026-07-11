O termo "pseudo-R²" é uma categoria geral que engloba várias métricas criadas para modelos de regressão não lineares (como a regressão logística). Como a regressão logística usa estimativa de máxima verossimilhança em vez de mínimos quadrados ordinários, o R² tradicional não funciona. Por isso, os estatísticos criaram "falsos" (pseudo) R² para imitar o comportamento do R² tradicional.

## Cox & Snell

Calcula a melhoria do modelo completo em relação ao modelo nulo usando verossimilhança. O valor máximo quase nunca chega a 1, mesmo em um modelo perfeito.

## Nigelkerke

O R2 de Nagelkerke é baseado em uma razão de verossimilhança, não em proporções de variância. É especificamente feito para aplicar a modelos de regressão ordinal ou nominal.

É apenas o R² de Cox & Snell dividido pelo seu valor máximo possível. Essa correção força o resultado a variar exatamente entre 0 e 1, facilitando a leitura humana.
## McFadden

É o pseudo-R² mais popular na área de economia e ciências sociais. Ele compara as log-verossimilhanças diretamente. (por que?)

$$1 - \frac{LL_{modelo}}{LL_{null}}$$

LL (Likelihood) = log-verossimilhança do modelo. Quanto mais próximo de 1, melhor o modelo.
## Recaptulação


| Métrica     | Escala vai de 0 a 1?   | Característica Principal                                |
| ----------- | ---------------------- | -----------------------:                                |
|Cox & Snell  | Não                    | O valor máximo teórico é menor que 1.                   |
|Nagelkerke   | Sim                    | Ajusta o Cox & Snell para alcançar o topo da escala.    |
|McFadden     | Sim                    | Mais rigoroso; valores baixos (0,2 a 0,4) já são ótimos.|
