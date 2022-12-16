import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig, type PluginOption } from 'vite'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
    react(),
    dts({ insertTypesEntry: true }),
    visualizer({ template: 'sunburst', title: 'Use Custom Cursor' }) as unknown as PluginOption,
  ],
  publicDir: 'public',
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src', 'lib') }],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'lib', 'index.ts'),
      name: 'use-custom-cursor',
      formats: ['es', 'umd'],
      fileName: (format) => `use-custom-cursor.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
  },
})
