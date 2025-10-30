NLP algorithms enable machines to understand, represent, and generate human language through models of syntax, semantics, and context.
They range from statistical text representations to transformer-based architectures that dominate modern NLP.


| Family                                             | Description                                                                                     | Representative Algorithms / Methods                                                                                                                                                                                                                                                                                 | Typical Use Cases                                                                      |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **1. Statistical / Traditional NLP**               | Early algorithms based on **counting, probabilities, and rules** to represent text numerically. | - **Bag of Words (BoW)**  <br> - **TF–IDF (Term Frequency–Inverse Document Frequency)**  <br> - **n-Grams / Language Models**  <br> - **Naïve Bayes Classifier (Text Classification)**  <br> - **Hidden Markov Models (HMM)** (for POS tagging, NER)                                                                | Text classification, spam detection, topic extraction, POS tagging.                    |
| **2. Distributional Semantic Models (Embeddings)** | Represent words in a continuous vector space where similar words have close representations.    | - **Word2Vec (CBOW, Skip-Gram)**  <br> - **GloVe (Global Vectors)**  <br> - **FastText**  <br> - **SVD-based embeddings (LSA)**                                                                                                                                                                                     | Semantic similarity, document clustering, recommendation, feature input for ML models. |
| **3. Sequence Models (Contextual Representation)** | Capture **word order and context** in sequences (unlike static embeddings).                     | - **RNN (Recurrent Neural Network)**  <br> - **LSTM (Long Short-Term Memory)**  <br> - **GRU (Gated Recurrent Unit)**  <br> - **Bidirectional RNN / BiLSTM**  <br> - **Seq2Seq (Encoder–Decoder)**                                                                                                                  | Sentiment analysis, translation, speech-to-text, text summarization.                   |
| **4. Attention & Transformer-Based Models**        | Use **self-attention** to model long-range dependencies efficiently; foundation of modern NLP.  | - **Transformer (Vaswani et al., 2017)**  <br> - **BERT (Bidirectional Encoder Representations from Transformers)**  <br> - **RoBERTa**, **DistilBERT**, **ALBERT**  <br> - **GPT Family (GPT-2, GPT-3, GPT-4, GPT-5)**  <br> - **T5 (Text-to-Text Transfer Transformer)**  <br> - **BART**, **DeBERTa**, **XLNet** | Text generation, summarization, QA, classification, chatbots, translation.             |
| **5. Topic & Document Models**                     | Discover latent topics and structures in text collections.                                      | - **Latent Dirichlet Allocation (LDA)**  <br> - **Non-Negative Matrix Factorization (NMF)**  <br> - **BERTopic (Transformer + Clustering Hybrid)**                                                                                                                                                                  | Topic extraction, document clustering, knowledge discovery.                            |
| **6. Graph & Hybrid Models**                       | Represent text as graphs or combine multiple paradigms.                                         | - **TextRank (Graph-based summarization)**  <br> - **Graph Neural Networks (GNNs) for NLP**  <br> - **Dependency Parsing Trees**  <br> - **Knowledge Graph Embeddings (TransE, DistMult)**                                                                                                                          | Summarization, entity linking, knowledge graphs, relation extraction.                  |


---

⚙️ Key Concepts

| Concept                      | Description                                                     |
| ---------------------------- | --------------------------------------------------------------- |
| **Tokenization**             | Splitting text into words, subwords, or characters.             |
| **Stopword Removal**         | Filtering frequent but semantically uninformative words.        |
| **Stemming / Lemmatization** | Reducing words to their root forms.                             |
| **Embedding**                | Mapping words/sentences to continuous vector spaces.            |
| **Contextualization**        | Adjusting embeddings based on neighboring words (Transformers). |
| **Transfer Learning**        | Fine-tuning large pre-trained models for specific tasks.        |
| **Prompt Engineering**       | Designing inputs to guide transformer behavior (GPT family).    |

---

🧠 Practical Tips

Always preprocess text consistently (tokenization, casing, normalization).

Use TF-IDF + classical ML models (e.g., Logistic Regression, SVM) as strong baselines.

Pretrained Transformers (BERT, GPT, etc.) drastically reduce training data needs.

Evaluate with F1-score, BLEU, ROUGE, or Perplexity depending on the task.

Use dimensionality reduction (PCA, UMAP) for visualization of embeddings.