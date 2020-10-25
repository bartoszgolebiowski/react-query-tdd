import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { QueryCache, ReactQueryCacheProvider } from "react-query";

const queryCache = new QueryCache();

const fetchRepos = () =>
  fetch("https://api.github.com/repos/tannerlinsley/react-query").then((res) =>
    res.json()
  );

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <App fetchRepos={fetchRepos} />
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
