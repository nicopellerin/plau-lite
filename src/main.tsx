import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import App from "./App";

import GlobalStyles from "./styles/GlobalStyles";

import "@fontsource/inter/variable.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </HashRouter>
      <GlobalStyles />
    </QueryClientProvider>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
