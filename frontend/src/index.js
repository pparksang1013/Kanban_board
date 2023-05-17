import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// STYLE
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style/GlobalStyle";
import theme from "./style/theme";

// CONTEXT
import { Provider } from "react-redux";
import { store } from "./context/global";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
