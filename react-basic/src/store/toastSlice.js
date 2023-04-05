import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toasts: []
}

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        // slice의 상태를 변경해줄 수 있는 곳이 reducers

        // state는 initalState 안에 있는 state
        addToast: (state, action) => {
            state.toasts.push(action.payload);
        },
        removeToast: (state, action) => {

            state.toasts = state.toasts
                .filter(toast => toast.id !== action.payload);
        }
    }
});

// toastSlice.actions => reducers 안에 정의된 action
console.log(toastSlice.actions.addToast("hello"));

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;

