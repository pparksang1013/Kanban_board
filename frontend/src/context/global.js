import { createStore } from "redux";

// 초기 상태
const initialState = {
    b_id: 0,
    u_id: 0,
    t_id: 0,
    SERVER_IP:
        "https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/",
    FILE_SEARCH_PATH:
        "https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/downloadfile/",
    FILE_UPLOAD_PATH:
        "https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/uploadmultiplefiles",
    TOKEN: "",
    admin: false,
};

// reducer
function setBoard(state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                b_id: action.b_id,
                u_id: action.u_id,
                admin: action.b_admin,
            };
        case "BOARDSELECT":
            return {
                ...state,
                b_id: action.b_id,
                u_id: action.u_id,
                admin: action.b_admin,
            };
        case "LOGOUT":
            return state;
        default:
            return state;
    }
}

// store 생성
export const store = createStore(setBoard);
