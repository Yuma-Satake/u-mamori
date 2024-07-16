import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import writeBuiltTimePlugin from './plugins/writeBuiltTimePlugin';
import visualizerFn from './plugins/visualizerFn';

const buildDir = 'dist';

export default defineConfig(() => {
  const script = process.env.npm_lifecycle_event ?? '';
  const isEnableAnalyze = script.includes('analyze');

  return {
    build: {
      outDir: buildDir,
    },
    server: {
      strictPort: true,
      port: 3000,
    },
    resolve: {
      mainFields: ['browser', 'module', 'main'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      global: 'window',
    },
    plugins: [react(), writeBuiltTimePlugin(buildDir), visualizerFn(isEnableAnalyze)],
  };
});
