import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://533b83dfb56f0f7be047fc8c825aa8fd@o4509378983821312.ingest.us.sentry.io/4509563334230016",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});