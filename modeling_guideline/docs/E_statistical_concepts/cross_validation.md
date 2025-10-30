

## Train/Test Split

Taken to one extreme, k may be set to 2 (not 1) such that a single train/test split is created to evaluate the model.

## LOOCV

Taken to another extreme, k may be set to the total number of observations in the dataset such that each observation is given a chance to be the held out of the dataset. This is called leave-one-out cross-validation, or LOOCV for short.

## Stratified

The splitting of data into folds may be governed by criteria such as ensuring that each fold has the same proportion of observations with a given categorical value, such as the class outcome value. This is called stratified cross-validation.

## Repeated

This is where the k-fold cross-validation procedure is repeated n times, where importantly, the data sample is shuffled prior to each repetition, which results in a different split of the sample.

## Nested

This is where k-fold cross-validation is performed within each fold of cross-validation, often to perform hyperparameter tuning during model evaluation. This is called nested cross-validation or double cross-validation.










References:

[Sklearn Cross Validation](https://scikit-learn.org/stable/modules/cross_validation.html)

https://machinelearningmastery.com/k-fold-cross-validation/