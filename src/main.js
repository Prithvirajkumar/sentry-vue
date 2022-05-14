import { createApp } from "vue";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

Sentry.init({
    app,
    dsn: import.meta.env.VITE_APP_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    autoSessionTracking: true,
    trackComponents: true,
  });

app.use(router);

app.mount("#app");
