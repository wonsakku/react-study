import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        // slice의 상태를 변경해줄 수 있는 곳이 reducers
        login: (state) => {
            localStorage.setItem("isLoggedIn", "yes");
            state.isLoggedIn = true;
        },
        logout: (state) => {
            localStorage.removeItem("isLoggedIn");
            state.isLoggedIn = false;
        }


        // state는 initalState 안에 있는 state
    }
});

// toastSlice.actions => reducers 안에 정의된 action

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

