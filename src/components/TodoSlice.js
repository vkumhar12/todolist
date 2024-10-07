import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    searchTodo: (state, action) => {
      state.todos = JSON.parse(localStorage.getItem("todos")).filter((todo) =>
        todo.text.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, searchTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
