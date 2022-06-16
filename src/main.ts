import { createApp } from 'vue';

import App from './components/App';

import { setupRouter } from './router';
import { setupStore } from './store';

const bootstrap = async (): Promise<void> => {
  const app = createApp(App);

  setupStore(app);

  const router = setupRouter(app);
  await router.isReady();

  app.mount('#app');
};

bootstrap();
