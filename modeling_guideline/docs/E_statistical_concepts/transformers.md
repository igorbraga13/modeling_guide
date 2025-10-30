 Transformer é uma arquitetura de rede neural desenvolvida especialmente para processar linguagem natural de forma mais eficiente e paralela que os modelos anteriores, como RNNs e [LSTMs](lstm.md).

 Ele foi proposto no famoso artigo de 2017 chamado [Attention is All You Need](https://arxiv.org/pdf/1706.03762) por pesquisadores da Google.

 🧠 O que é um Transformer?

É uma arquitetura baseada em atenção, projetada para lidar com sequências de dados (como frases) sem precisar processá-las palavra por palavra, como as redes recorrentes.

🧩 Componentes principais do Transformer

1. Embedding + Positional Encoding

    - Cada palavra é convertida em um vetor (embedding).
    - Como o Transformer não lê em ordem sequencial, é necessário adicionar informações sobre a posição das palavras.

2. Self-Attention

    - O modelo aprende quanto cada palavra deve prestar atenção às outras da frase.
    - Isso permite capturar relações de longo alcance com facilidade.

3. Multi-Head Attention

    - O modelo divide a atenção em várias “cabeças”, cada uma olhando para diferentes relações semânticas entre palavras.
    - Isso melhora a capacidade de aprender múltiplos padrões simultaneamente.

4. Feed Forward Neural Network

    - Após a atenção, cada vetor de palavra passa por uma pequena rede neural para processamentos adicionais.

5. Residual Connections + Layer Normalization
    
    - Permitem que o modelo seja treinado de forma mais estável e profunda.

| Parte       | Função                                         | Usado em...            |
| ----------- | ---------------------------------------------- | ---------------------- |
| **Encoder** | Lê o texto de entrada (ex: “Qual é seu nome?”) | BERT, T5 (com encoder) |
| **Decoder** | Gera a resposta ou sequência de saída          | GPT, LLaMA             |

💡 Exemplo de funcionamento simplificado

Entrada:

    "O cachorro correu para o parque"

O Self-Attention avalia, por exemplo:

- O que "correu" pode significar aqui?
- Deve prestar mais atenção em "cachorro" do que em "parque".

Assim o modelo entende que:

    “cachorro” é quem “correu”, e “parque” é o destino.

🚀 Por que o Transformer foi revolucionário?

- Processa todos os tokens ao mesmo tempo (paralelamente) — mais rápido que RNNs.
- Captura dependências longas entre palavras.
- Escala muito bem para grandes volumes de dados e parâmetros.