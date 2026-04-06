import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.nuju.journal',
  appName: 'Nuju',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#7C6EDB',
      showSpinner: false,
      fadeOutDuration: 200,
    },
  },
};

export default config;
