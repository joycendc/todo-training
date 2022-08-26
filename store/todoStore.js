import create from "zustand";
import { persist } from "zustand/middleware";

const useTodoStore = create(
  persist((set) => ({
    todos: [],
    showAll: true,
    showActive: false,
    setShowAll: () => {
      set((state) => ({
        showAll: !state.showAll
      }));
    },
    setShowActive: () => {
      set((state) => ({
        showActive: !state.showActive
      }));
    },
    setTodos: (newTodo) => {
      set(() => ({
        todos: newTodo
      }));
    },
    addTodo: (todo) => {
      set((state) => ({
        todos: [...state.todos, todo]
      }));
    },
    removeTodo: (id) => {
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id)
      }));
    },
    toggleCompletedState: (id) => {
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.isCompleted } : todo
        )
      }));
    }
  }))
);

export default useTodoStore;
