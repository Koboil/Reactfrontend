import * as Sentry from '@sentry/nextjs';
import { Replay } from '@sentry/replay';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
   dsn: process.env.SENTRY_DSN,
   enabled: process.env.NODE_ENV !== 'development',
   environment: process.env.SENTRY_ENVIRONMENT | 'dev',
   replaysSessionSampleRate: 0.03,
   replaysOnErrorSampleRate: 1.0,
   ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
   ],
   tracesSampleRate: process.env.SENTRY_ENVIRONMEN === 'prod' ? 0.18 : 1.0,
   integrations: [
      new Replay(),
      new BrowserTracing({
         tracePropagationTargets: [/^(\w.)*training.alinkka.eu/],
      }),
   ],
});
