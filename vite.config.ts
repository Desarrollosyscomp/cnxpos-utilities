// ==================== CONFIGURACIÓN: Vite ====================
// Solo registra el plugin de Vue; la URL de la API llega por variables VITE_*.
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(() => {
    return {
      plugins: [vue()],
    }
})
