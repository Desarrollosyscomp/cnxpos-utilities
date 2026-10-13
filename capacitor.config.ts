// ==================== CONFIGURACIÓN: Capacitor ====================
// Empaquetado Android: toma el build web de dist/ (appId com.example.app).
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'cnxpos-utilities',
  webDir: 'dist'
};

export default config;
