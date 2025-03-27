
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2e7152894fc7434f93eea019880e21ee',
  appName: 'learn-trade-master',
  webDir: 'dist',
  server: {
    url: 'https://2e715289-4fc7-434f-93ee-a019880e21ee.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystorePassword: null,
      keystoreAlias: null,
      keystoreAliasPassword: null,
      releaseType: null,
    }
  }
};

export default config;
