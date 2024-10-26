import * as Sentry from '@sentry/nextjs';
// import { RewriteFrames } from "@sentry/integrations";

Sentry.init({
   dsn: process.env.SENTRY_DSN,
   enabled: process.env.NODE_ENV !== 'development',
   environment: process.env.ENVIRONMENT | 'dev',
   // Could help to fix the paths, but does not
   // integrations: [
   //   new RewriteFrames({
   //     root: global.__rootdir__,
   //   }),
   // ],
});
