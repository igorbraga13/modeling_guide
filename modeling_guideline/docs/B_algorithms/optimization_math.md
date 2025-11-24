## Optimization

| Category                            | Algorithms                                   | Description                                                    | Typical Use Cases                                               |
| ----------------------------------- | -------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| **Linear Programming (LP)**         | **Simplex**, Interior-Point, Revised Simplex | Solve problems with a linear objective and linear constraints. | Resource allocation, cost minimization, portfolio optimization. |
| **Integer Programming (IP)**        | Branch and Bound, Cutting Plane              | Variables must be integers; used for discrete decisions.       | Scheduling, routing, workforce optimization.                    |
| **Mixed-Integer Programming (MIP)** | Simplex + Branch and Bound                   | Combination of continuous and integer variables.               | Credit limits, production planning.                             |
| **Quadratic / Convex Programming**  | Active-Set, Gradient Projection              | Quadratic objectives with linear constraints.                  | SVM optimization, risk minimization.                            |
| **Nonlinear Programming (NLP)**     | Sequential Quadratic Programming (SQP), BFGS | Nonlinear objectives or constraints.                           | Calibration, engineering optimization.                          |
| **Stochastic / Metaheuristics**     | Simulated Annealing, Genetic Algorithm       | Search heuristics for non-convex or discontinuous problems.    | Pricing, resource distribution.                                 |

        The Simplex Algorithm is the foundation of linear optimization — it finds the best decision within linear constraints, making it the prescriptive counterpart to predictive models.

        
        The Simplex Algorithm is the prescriptive counterpart to predictive models — while predictive models estimate what will happen, Simplex determines what should be done to achieve the optimal outcome under constraints.

🧠 Exemplo didático

🎯 Problema clássico de Programação Linear (LP):

\[
\text{Minimize: } \quad Z = 3x_1 + 2x_2
\]

\[
\text{Subject to:}
\quad
\begin{cases}
x_1 + x_2 \le 4 \\
2x_1 + x_2 \le 5 \\
x_1, x_2 \ge 0
\end{cases}
\]

O Simplex Algorithm encontra a solução ótima navegando pelos vértices do poliedro formado por essas restrições.

📘 Interpretação no guia:

Simplex é o “árvore de decisão” da otimização linear — percorre sistematicamente os vértices até encontrar o ótimo global (garantido para LPs convexos).

🧮 5️⃣ Principais bibliotecas e frameworks

| Framework                  | Linguagem           | Observações                                                      |
| -------------------------- | ------------------- | ---------------------------------------------------------------- |
| **PuLP**                   | Python              | Interface simples para Linear/Integer Programming.               |
| **OR-Tools (Google)**      | Python / C++ / Java | Suporte para LP, MIP, Constraint Programming.                    |
| **CVXPY**                  | Python              | Modelagem de problemas convexos (Linear, Quadratic, Cone).       |
| **Gurobi / CPLEX / Mosek** | Python / R / C++    | Solvers comerciais otimizados (usam Simplex e métodos híbridos). |
| **Pyomo**                  | Python              | Framework open-source para modelagem matemática completa.        |


🔗 6️⃣ Relação com outras famílias

| Conexão                     | Relação                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| **Evolutionary Algorithms** | Alternativas heurísticas ao Simplex para problemas não convexos ou com múltiplos ótimos. |
| **Reinforcement Learning**  | Ambos resolvem problemas de otimização sequencial — RL usa otimização de políticas.      |
| **Hybrid Models**           | Previsão (ML) + Decisão ótima (Simplex/MIP).                                             |
| **Bayesian Methods**        | Podem usar otimização convexa para maximizar a posteriori (MAP) durante o treinamento.   |

## Mathematical

### Markov Chain

A Markov Chain is a stochastic model describing a sequence of possible events where the probability of each event depends only on the state attained in the previous event. It is characterized by the Markov property, which states that the future state is independent of the past states given the present state.

https://im.ufal.br/evento/bsbm/download/minicurso/cadeias.pdf