🧠 O que é uma função de perda?

É uma função matemática que mede o erro entre a previsão do modelo e o valor real (rótulo).

Durante o treinamento, a rede ajusta seus pesos para minimizar essa perda, usando técnicas como gradiente descendente.

## CrossEntropyLoss (Classificação Multiclasse)

📌 Usada quando:

Você quer classificar exemplos em várias classes mutuamente exclusivas (ex: 0, 1, 2...).

🧮 Como funciona:

Combina Softmax (transforma os scores do modelo em probabilidades) com log loss.

🔍 Fórmula:

Para um único exemplo com classe correta 𝑦 e predição $\hat{y}$ vetor de logits:

$$Loss = -log(\frac{e^{\hat{y}_y}}{\sum_{j}e^{\hat{y}_{j}}})$$

Ou seja, penaliza se a probabilidade da classe correta for baixa.

## MSELoss (Erro Quadrático Médio – para regressão)

📌 Usada quando:

O alvo é um número contínuo (ex: prever dias, saldo, nota, etc.).

🧮 Como funciona:

Mede a média das diferenças ao quadrado entre os valores reais e previstos.

🔍 Fórmula:

$$Loss= \frac{1}{n} \sum_{i}(y_{i} - \hat{y_i})^2$$

Penaliza grandes erros com mais força que erros pequenos.

## BCEWithLogitsLoss (Classificação binária)

📌 Usada quando:

A saída é binária (0 ou 1), e o modelo retorna logits (antes do sigmoid).

🧮 Como funciona:

Combina o sigmoid com a Binary Cross-Entropy Loss.

🔍 Fórmula:

$$Loss=−[y⋅log(\sigma(\hat{y}))+(1−y)⋅log(1− \sigma( \hat{y}))] $$

Onde $\sigma(\hat{y})$ é o valor transformado por sigmoid (probabilidade).

🧠 Papel da função de perda no aprendizado

Durante o backpropagation:

1. Calcula-se a derivada da perda em relação aos parâmetros do modelo.
2. Essa informação orienta o ajuste dos pesos para reduzir a perda.
3. O processo se repete por muitas épocas até o modelo aprender padrões úteis.