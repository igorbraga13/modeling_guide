Modelo de linguagem de grande porte. Ele é um tipo de modelo de inteligência artificial treinado com enormes volumes de texto para compreender e gerar linguagem humana de forma coerente.

Características principais de um LLM:

- Baseado em redes neurais profundas, especialmente arquiteturas como [transformers](transformers.md).
- Treinado com bilhões ou trilhões de palavras, abrangendo livros, sites, artigos e outros textos.
- Capaz de realizar múltiplas tarefas de linguagem natural, como:
    - Responder perguntas
    - Traduzir idiomas
    - Resumir textos
    - Gerar código
    - Produzir textos criativos

Exemplos de LLMs:

- GPT-4 (usado aqui no ChatGPT)
- Claude (da Anthropic)
- LLaMA (da Meta)
- Gemini (do Google)

        GPT (Generative Pre-trained Transformer)

Um LLM (Large Language Model) funciona com base em redes neurais profundas, especialmente em uma arquitetura chamada Transformer, que revolucionou o campo do [Processamento de Linguagem Natural (NLP)](nlp.md).

Passo a passo:

1. Treinamento com texto massivo

- O modelo é alimentado com bilhões de frases e documentos (livros, sites, artigos, fóruns, etc.).
- Ele aprende padrões estatísticos da linguagem: qual palavra tende a vir depois de outra, como frases se estruturam, como conceitos se relacionam.

2. Aprendizado de probabilidade de palavras

- A tarefa principal durante o treinamento é prever a próxima palavra em uma sequência.
- Exemplo: se o modelo vê a frase "O céu está", ele tenta prever que a próxima palavra possa ser "azul".

3. Transformer: a base dos LLMs

- O Transformer é uma arquitetura neural baseada em um mecanismo chamado atenção.
- Ele avalia quais palavras da frase são mais relevantes para prever a próxima palavra.
- Isso permite que o modelo entenda relações complexas entre palavras mesmo distantes entre si.

4. Tokens e embeddings

- O texto é dividido em tokens (que podem ser palavras ou pedaços de palavras).
- Cada token é transformado em um vetor numérico chamado embedding, que representa seu significado no contexto.

5. Inferência (uso após o treinamento)

- Quando você digita algo, o modelo transforma seu texto em tokens e vetores.
- Com base nisso, ele gera a próxima palavra/token, uma de cada vez.
- A saída final parece humana porque o modelo aprendeu a imitar os padrões da linguagem natural.

⚙️ Resumindo tecnicamente:

- O LLM é um modelo de autoregressão que gera texto token por token.
- Ele usa atenção para entender o contexto inteiro de entrada.
- A geração é feita com base em probabilidades aprendidas no treinamento.

📐 Arquitetura de uma LLM (ex: GPT-style)
Um LLM é basicamente composto por várias camadas empilhadas de blocos Transformer, que seguem essa estrutura:

🔁 Repetido por N camadas:

        [Input Tokens] ──► Token Embedding
                            │
                            ▼
                Positional Encoding (posição das palavras)
                            │
                            ▼
                ┌─────────────────────────────┐
                │      Transformer Block    │ ◄── (repetido N vezes)
                │                           │
                │  ┌───────────────────────┐  │
                │  │ Masked Self-Attention  │ ◄── impede "ver o futuro"
                │  └───────────────────────┘  │
                │                           │
                │  ┌───────────────────────┐  │
                │  │ Feed Forward Network│  │
                │  └───────────────────────┘  │
                │                           │
                └─────────────────────────────┘
                            │
                            ▼
                Final Linear + Softmax Layer
                            │
                            ▼
                    [Probabilidade do próximo token]

🔍 Explicando os componentes:

1. Token Embedding
Transforma cada token (palavra ou subpalavra) em um vetor numérico com significado.

2. Positional Encoding
Como o Transformer não é sequencial como uma RNN, essa etapa adiciona informações sobre a posição de cada palavra na frase.

3. Masked Self-Attention
Cada palavra "olha" para as anteriores e calcula o quanto deve prestar atenção a elas para prever a próxima.

    - Máscara: impede o modelo de ver palavras futuras (ex: prever palavra 4 sem ver a 5).

4. Feed Forward Network
Aplica uma rede neural simples para refinar a informação após a atenção.

5. Residual Connections + Layer Normalization
Permitem que o sinal flua mais facilmente entre camadas, estabilizando o aprendizado.

6. Softmax Final
Transforma a saída em uma distribuição de probabilidade para o próximo token.

🧠 Visão Geral

| Modelo                | Arquitetura Base                        | Direção                                | Objetivo Principal   | Uso Típico                     |
| --------------------- | --------------------------------------- | -------------------------------------- | -------------------- | ------------------------------ |
| **GPT (ex: GPT-3/4)** | Transformer **Decoder**                 | Unidirecional (da esquerda p/ direita) | Geração de texto     | Chatbots, redação, programação |
| **BERT**              | Transformer **Encoder**                 | Bidirecional                           | Compreensão de texto | Classificação, NER, QA         |
| **LLaMA**             | Transformer **Decoder-only** (como GPT) | Unidirecional (com ajustes)            | Geração/compreensão  | Open-source multitarefas       |

⚙️ Arquitetura Técnica

| Componente            | **GPT**                     | **BERT**                         | **LLaMA**                    |
| --------------------- | --------------------------- | -------------------------------- | ---------------------------- |
| Tipo de Transformer   | Decoder                     | Encoder                          | Decoder                      |
| Atenção               | **Máscara causal**          | **Atenção total (bidirecional)** | **Máscara causal otimizada** |
| Embedding posicional  | Absoluto                    | Absoluto                         | **Rotary positional** (RoPE) |
| Pré-treinamento       | Prever **próximo token**    | Prever **tokens mascarados**     | Prever próximo token         |
| Tamanho típico (base) | 12 camadas, 117M parâmetros | 12 camadas, 110M parâmetros      | 7B a 65B parâmetros          |
| Arquitetura paralela  | Sim (camadas sequenciais)   | Sim                              | Sim (mais otimizada)         |

🎯 Objetivo de Treinamento

- GPT: Aprende a prever o próximo token na sequência, uma palavra de cada vez.
- BERT: Aprende a reconstruir tokens mascarados no meio da frase, usando o contexto de ambos os lados.
- LLaMA: Igual ao GPT, mas com técnicas mais eficientes para treinamento (RoPE, weight tying etc.).

| Tarefa                 | **GPT**           | **BERT**                  | **LLaMA**   |
| ---------------------- | ----------------- | ------------------------- | ----------- |
| Geração de texto       | ✅ Alta            | ❌ Não é feito para isso   | ✅ Alta      |
| Classificação          | ✅ (com adaptação) | ✅ Direto                  | ✅ (ajustes) |
| Pergunta e resposta    | ✅                 | ✅ (QA do tipo extractivo) | ✅           |
| Fine-tuning em tarefas | ✅                 | ✅                         | ✅           |

🔍 Principais Diferenças

- Direcionalidade: BERT é bidirecional (entende contexto total); GPT e LLaMA são unidirecionais (mais naturais para geração).
- Tarefa de pré-treinamento: BERT foca em compreensão (tokens faltando), GPT/LLaMA em geração (fluxo contínuo).
- Open-source: BERT e LLaMA são abertos; GPT não é (apenas via API).
- Positional Encoding:
    - BERT e GPT usam absoluto (posição codificada fixamente)
    - LLaMA usa RoPE, que permite generalizar melhor para sequências longas