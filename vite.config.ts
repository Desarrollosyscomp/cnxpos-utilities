import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    return {
      plugins: [vue()],
      build: {
        rollupOptions: {
          input:
            mode === 'mobile'
              ? 'src/main.mobile.ts'
              : 'src/main.ts'
        }
      }
    }
})
