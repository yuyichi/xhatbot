/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// ./src/stores/index.ts
import { createContext, useContext } from 'react';
import { STORE_TODO, TodoStore } from './todo';

function createStores() {
  return {
    [STORE_TODO]: new TodoStore(),
  };
}

const stores = createStores();

const StoresContext = createContext(stores);

// hooks 使用笔记看这里 -> https://github.com/olivewind/blog/issues/1
const useStores = () => useContext(StoresContext);

function useTodoStore() {
  const { todoStore } = useStores();
  console.log(todoStore)
  return todoStore;
}

export {
  stores,
  useTodoStore,
  StoresContext,
};