O F1 Score é uma métrica que combina [precisão](precision.md) e [recall](recall.md) de maneira equilibrada para avaliar o desempenho de um modelo de classificação. É especialmente útil quando há um desbalanceamento entre as classes, pois leva em consideração tanto os falsos positivos quanto os falsos negativos.

$$\frac{TP}{TP+\frac{1}{2}(FP+FN)}$$