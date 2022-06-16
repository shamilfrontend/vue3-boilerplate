import { createPinia } from 'pinia';
import type { App } from 'vue';

const store = createPinia();
const setupStore = (app: App<Element>): void => {
  app.use(store);
};

export { store, setupStore };
export * from './modules';
