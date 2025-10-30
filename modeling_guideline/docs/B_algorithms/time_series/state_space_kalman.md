# State Space & Kalman-Based Models

Essence: use latent variables (states) to model dynamic systems recursively.

| Algorithm                         | Description                                         | Typical Use Cases                        |
| --------------------------------- | --------------------------------------------------- | ---------------------------------------- |
| **Kalman Filter**                 | Recursive estimation for linear Gaussian systems.   | Sensor fusion, control systems, finance. |
| **Extended Kalman Filter (EKF)**  | Linearization for nonlinear systems.                | Robotics, navigation, tracking.          |
| **Unscented Kalman Filter (UKF)** | Sigma-point method for better nonlinear estimation. | Time-varying processes, control.         |
| **Dynamic Linear Models (DLM)**   | Bayesian formulation of state-space models.         | Online forecasting, adaptive systems.    |
