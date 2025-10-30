# Density-Based Clustering

Essência: encontra regiões de alta densidade separadas por regiões de baixa densidade.
Ideal para detectar formas irregulares e outliers.

| Algorithm                                                                | Description                                                                | Notes                                          |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------- |
| **DBSCAN (Density-Based Spatial Clustering of Applications with Noise)** | Core density-based algorithm; forms clusters by neighborhood reachability. | Robust to outliers; no need to specify *k*.    |
| **OPTICS (Ordering Points To Identify Clustering Structure)**            | Extends DBSCAN by ordering points based on density reachability.           | Handles varying densities.                     |
| **HDBSCAN (Hierarchical DBSCAN)**                                        | Hierarchical version that automatically determines optimal clusters.       | State-of-the-art density-based method.         |
| **DENCLUE (DENsity-based CLUstEring)**                                   | Uses kernel density estimation for flexible density modeling.              | Theoretical foundation for many newer methods. |


🧠 Common use cases: spatial/geolocation data, anomaly detection, fraud or event detection.