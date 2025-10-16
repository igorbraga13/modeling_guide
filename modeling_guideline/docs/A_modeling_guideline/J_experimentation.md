Por que incluir um tópico de Experimentação pós-deploy?

Validação de impacto causal: avaliar se o uplift no resultado (ex: redução de inadimplência, aumento de aprovação) é de fato causado pelo modelo e não por ruído/estacionalidade.

Teste A/B / Teste multivariado: comparar grupo controle vs. tratamento para validar hipóteses.

Inferência causal: usar técnicas como difference-in-differences, propensity score matching, causal forests quando randomização não é viável.

Interpretação de resultados: separar efeito direto do modelo do efeito de outras mudanças (ex: política de crédito, campanhas).

Ciclo de feedback: resultados da experimentação alimentam nova rodada de modelagem e priorização de features.

## Inferência Causal

### A/B testing & uplift modeling

### Controle Sintético

[Causal Inference for the Brave and True](https://matheusfacure.github.io/python-causality-handbook/landing-page.html)
[Notebook Python](https://github.com/matheusfacure/causal-inference-in-python-code/blob/main/causal-inference-in-python/09-Synthetic-Control.ipynb)

As features são as volumetrias dos outros estados
Ajusta-se uma regressão com os dados dos outros estados para estimar como seria seu estado de interesse.

Resíduos aleatórios (igual regressão)

Nosso médio aumentdo  é o percentual de impacto da ação


## Business Impact & Value Realization