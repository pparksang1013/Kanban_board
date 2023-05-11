import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style/GlobalStyle";
import theme from "./style/theme";
import { createStore } from 'redux';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById("root"));

// 초기 상태
const initialState = {
    b_id: 0,
    u_id: 0,
    SERVER_IP : "http://localhost:9080",
    admin: false
};

// reducer
function setBoard(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, b_id: action.b_id, u_id: action.u_id, admin: action.b_admin };
        case 'BOARDSELECT':
            return { ...state, b_id: action.b_id, u_id: action.u_id, admin: action.b_admin };
        case 'LOGOUT':
            return state
        default:
            return state;
    }
}

// store 생성
const store = createStore(setBoard);
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
