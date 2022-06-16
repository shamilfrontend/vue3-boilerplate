import { resolve } from 'path';

/* eslint-disable import/no-extraneous-dependencies */
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import { defineConfig, loadEnv } from 'vite';
/* eslint-enable import/no-extraneous-dependencies */

export default defineConfig(params => {
  const env = loadEnv(params.mode, process.cwd());

  return {
    plugins: [
      vue(),
      legacy({
        // Plugin does not use browserslistrc
        // https://github.com/vitejs/vite/issues/2476
        targets: ['defaults', 'not IE 11']
      })
    ],

    css: {
      postcss: {
        plugins: [autoprefixer()]
      }
    },

    server: {
      port: 9000,
      proxy: {
        '/api': {
          target: env.VITE_API_ENDPOINT,
          changeOrigin: true,
          secure: false,
          rewrite: (path): string => path.replace(/^\/api/, '')
        }
      }
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            utils: ['date-fns', 'lodash-es', 'mitt', 'pinia']
          }
        }
      }
    },

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
    }
  };
});
