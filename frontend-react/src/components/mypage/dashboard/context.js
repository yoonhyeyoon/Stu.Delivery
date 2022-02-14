import React, { useReducer, useMemo, useCallBack } from "react";

const initialState = {
  todos: [],
};

const countAllTodo = (todos) => {
  return todos.length;
};

const countCompleteTodo = (todos) => {
  return todos.filter((todo) => todo.complete).length;
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return { todos: state.todos.concat(action.todo) };
    default:
      return state;
  }
}
