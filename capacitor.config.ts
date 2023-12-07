import { CapacitorConfig } from '@capacitor/cli';

const isPortalsCli = process.env.PORTALS_CLI === 'true';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Portals Debug Web App',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  loggingBehavior: isPortalsCli ? 'production' : 'debug',
  plugins: {
    CapacitorHttp: {
      enabled: isPortalsCli,
    },
  },
};

export default config;
