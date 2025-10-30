ARIMA é feito para prever variáveis contínuas (ex: vendas, temperatura), com valores reais, normalmente distribuídos (ou estabilizados via diferenciação).
❌ ARIMA não é adequado para variáveis de contagem, especialmente quando os valores são baixos e com muitos zeros.

ARIMA assume erro normalmente distribuído, o que não respeita a variância e assimetria típica das contagens.

ARIMA modela séries contínuas com um ponto por vez. No seu caso, há vários clientes com séries de eventos sparsas (só alguns dias com pedidos por mês), então:

- A série é muito curta por cliente.
- Os valores são quase sempre 0, 1.

Ou seja, não há estrutura temporal suficiente para justificar um modelo ARIMA por cliente, e agregando você perde personalização.