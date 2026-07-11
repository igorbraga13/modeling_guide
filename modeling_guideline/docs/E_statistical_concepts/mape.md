Calcula o Erro Percentual Médio.
​
$$ MAPE = \frac{100}{n} \sum^{n}_{i=1}| \frac{y_{i} - \hat{y}_i}{y_{i}}| $$

Exemplo: MAPE = 12% indica erro percentual absoluto médio de aproximadamente 12%.

Problemas:

- Não funciona bem quando o valor real é zero.
- Pode produzir valores enormes quando o real está próximo de zero.
- Pode favorecer previsões abaixo do valor real.