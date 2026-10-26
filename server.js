const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/lr", (req, res) => {
  const lr = `   import numpy as np
            import matplotlib.pyplot as plt
            from sklearn.linear_model import LinearRegression

            X = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)    
            y = np.array([20, 30, 40, 50, 60])

            model = LinearRegression()
            model.fit(X, y)

            pred = model.predict(X)
            print("Predicted marks:", model.predict([[6]])[0])

            plt.scatter(X, y)
            plt.plot(X, pred, color='red')
            plt.xlabel("Hours Studied")
            plt.ylabel("Marks")
            plt.show() `;
  res.type("text/plain").send(lr);
});

app.get("/api/mr", (req, res) => {
  const mr = `   import numpy as np
            import matplotlib.pyplot as plt
            from sklearn.linear_model import LinearRegression

            X = np.array([[2,7,1], [3,6,2], [4,8,3],
              [5,7,4], [6,8,5]])
            y = np.array([30, 40, 50, 60, 70])

            model = LinearRegression()
            model.fit(X, y)

            print("Predicted Marks:", model.predict([[7,8,6]])[0])

            fig = plt.figure()
            ax = fig.add_subplot(111, projection='3d')
            ax.scatter(X[:,0], X[:,1], y)
            ax.set_xlabel("Study Hours")
            ax.set_ylabel("Sleep Hours")
            ax.set_zlabel("Marks")
            plt.show() `;
  res.type("text/plain").send(mr);
});

app.get("/api/logr", (req, res) => {
  const logr = `   import numpy as np
                import matplotlib.pyplot as plt
                from sklearn.linear_model import LogisticRegression

                X = np.array([[1], [2], [3], [4], [5], [6]])
                y = np.array([0, 0, 0, 1, 1, 1])

                model = LogisticRegression()
                model.fit(X, y)

                print("Prediction:", model.predict([[4]])[0])

                x = np.linspace(0, 7, 100).reshape(-1, 1)
                p = model.predict_proba(x)[:, 1]

                plt.scatter(X, y, label="Actual Data")
                plt.plot(x, p, color="red", label="Probability of Pass")
                plt.axhline(0.5, color="green", linestyle="--")
                plt.xlabel("Study Hours")
                plt.ylabel("Probability of Pass")
                plt.legend()
                plt.show() `;
  res.type("text/plain").send(logr);
});

app.get("/api/cart1", (req, res) => {
  const cart1 = `    import numpy as np
                import matplotlib.pyplot as plt
                from sklearn.tree import DecisionTreeClassifier, plot_tree

                X = np.array([[1], [2], [3], [4], [5], [6]])
                y = np.array([0, 0, 0, 1, 1, 1])

                model = DecisionTreeClassifier()
                model.fit(X, y)

                print("Prediction:", model.predict([[4]])[0])

                plot_tree(model, feature_names=["Hours"], class_names=["Fail", "Pass"],
                filled=True)
                plt.show() `;
  res.type("text/plain").send(cart1);
});

app.get("/api/cart2", (req, res) => {
  const cart2 = `    import numpy as np
                import matplotlib.pyplot as plt
                from sklearn.tree import DecisionTreeRegressor, plot_tree

                X = np.array([[1], [2], [3], [4], [5], [6]])
                y = np.array([20, 30, 40, 50, 60, 70])

                model = DecisionTreeRegressor()
                model.fit(X, y)

                print("Predicted Marks:", model.predict([[4]])[0])

                plot_tree(model, feature_names=["Hours"], filled=True)
                plt.show() `;
  res.type("text/plain").send(cart2);
});

app.get("/api/boost", (req, res) => {
  const boost = `    import numpy as np
                import matplotlib.pyplot as plt
                from sklearn.ensemble import AdaBoostClassifier

                X = np.array([[1], [2], [3], [4], [5], [6]])
                y = np.array([0, 0, 0, 1, 1, 1])

                model = AdaBoostClassifier(n_estimators=10, random_state=42)
                model.fit(X, y)

                print("Prediction:", model.predict([[4]])[0])

                plt.scatter(X, y, label="Actual Data")
                plt.scatter(X, model.predict(X), color="red", marker="x",
                label="Predicted Data")
                plt.xlabel("Study Hours")
                plt.ylabel("Result (0=Fail, 1=Pass)")
                plt.legend()
                plt.show() `;
  res.type("text/plain").send(boost);
});

app.get("/api/bag", (req, res) => {
  const bag = `      import numpy as np
                import matplotlib.pyplot as plt
                from sklearn.ensemble import BaggingClassifier
                from sklearn.tree import DecisionTreeClassifier

                X = np.array([[1], [2], [3], [4], [5], [6]])
                y = np.array([0, 0, 0, 1, 1, 1])

                model = BaggingClassifier(
                estimator=DecisionTreeClassifier(),
                n_estimators=10,
                random_state=42
                )
                model.fit(X, y)

                print("Prediction:", model.predict([[4]])[0])

                plt.scatter(X, y, label="Actual")
                plt.scatter(X, model.predict(X), color="red", marker="x",
                label="Predicted")
                plt.xlabel("Study Hours")
                plt.ylabel("Result (0=Fail, 1=Pass)")
                plt.legend()
                plt.show() `;
  res.type("text/plain").send(bag);
});

app.get("/api/svm", (req, res) => {
  const svm = `      import numpy as np
                import matplotlib.pyplot as plt
                from sklearn.svm import SVC

                X = np.array([[1], [2], [3], [4], [5], [6]])
                y = np.array([0, 0, 0, 1, 1, 1])

                model = SVC(kernel='linear')
                model.fit(X, y)

                print("Prediction:", model.predict([[4]])[0])

                plt.scatter(X, y, c=y, cmap='coolwarm')
                plt.xlabel("Study Hours")
                plt.ylabel("Result (0=Fail, 1=Pass)")
                plt.show() `;
  res.type("text/plain").send(svm);
});

app.get("/api/gbc", (req, res) => {
  const gbc = `      import networkx as nx
                import matplotlib.pyplot as plt

                G = nx.karate_club_graph()

                communities = next(nx.community.girvan_newman(G))

                colors = []
                for node in G.nodes():
                for i, c in enumerate(communities):
                    if node in c:
                        colors.append(i)

                nx.draw(G, with_labels=True, node_color=colors,
                cmap=plt.cm.Set2, node_size=500)
                plt.show()

                print("Communities:", [list(c) for c in communities]) `;
  res.type("text/plain").send(gbc);
});

app.get("/api/dbscan", (req, res) => {
  const dbscan = `       import numpy as np
                    import matplotlib.pyplot as plt
                    from sklearn.cluster import DBSCAN

                    X = np.array([
                        [1, 2], [2, 2], [2, 3],
                        [8, 7], [8, 8], [7, 7],
                        [15, 15]
                    ])

                    model = DBSCAN(eps=2, min_samples=2)
                    y = model.fit_predict(X)

                    print("Cluster Labels:", y)

                    plt.scatter(X[:, 0], X[:, 1], c=y, cmap='rainbow')
                    plt.xlabel("X")
                    plt.ylabel("Y")
                    plt.title("DBSCAN Clustering")
                    plt.show() `;
  res.type("text/plain").send(dbscan);
});

app.get("/api/pca", (req, res) => {
  const pca = `          import numpy as np
                    import matplotlib.pyplot as plt
                    from sklearn.decomposition import PCA
                    from sklearn.preprocessing import StandardScaler

                    X = np.array([[2, 3], [3, 4], [4, 5],
                    [5, 6], [6, 7], [7, 8]])

                    X = StandardScaler().fit_transform(X)

                    pca = PCA(n_components=1)
                    X_pca = pca.fit_transform(X)

                    print("Reduced Data:\n", X_pca)

                    plt.scatter(X_pca, np.zeros(len(X_pca)))
                    plt.title("PCA - Reduced Data")
                    plt.xlabel("Principal Component 1")
                    plt.show() `;
  res.type("text/plain").send(pca);
});

app.listen(PORT, () => {
  console.log("server running");
});
