O LSTM pode modelar a sequência de comportamento de um cliente ao longo do mês, ou mesmo a evolução mês a mês.
Você pode usar o LSTM como:

- Many-to-one: prever o número de dias restantes com base na sequência até agora;
- Many-to-many: prever uma sequência binária de 1s/0s indicando se haverá pedido nos próximos dias, e somar os 1s (dias com pedidos restantes).

LSTMs brilham com longas dependências.