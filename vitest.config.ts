import { resolve } from 'path';

/* eslint-disable import/no-extraneous-dependencies */
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
/* eslint-disable import/no-extraneous-dependencies */

export default defineConfig(() => {
  return {
    plugins: [vue()],
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /^@\/(.+)/,
          replacement: `${resolve(__dirname, 'src')}/$1`
        },
        // #/type => types
        {
          find: /^#\/types$/,
          replacement: `${resolve(__dirname, 'types')}`
        },
        // #/types/xxxx => types/xxxx
        {
          find: /^#\/types\/(.+)/,
          replacement: `${resolve(__dirname, 'types')}/$1`
        },
        // #/tests/xxxx => tests/xxxx
        {
          find: /^#\/tests\/(.+)/,
          replacement: `${resolve(__dirname, 'tests')}/$1`
        }
      ]
    },
    test: {
      environment: 'happy-dom',
      coverage: {
        reportsDirectory: `${resolve(__dirname, 'tests/unit/coverage')}`
      },
      deps: {
        inline: ['lodash-es', 'object-hash']
      }
    }
  };
});
