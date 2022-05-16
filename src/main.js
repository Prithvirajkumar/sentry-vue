import { createApp } from "vue";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import release from './utils/release'
// import { Debug as DebugIntegration } from "@sentry/integrations";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const RELEASE = release(import.meta.env.VITE_APP_PACKAGE)
console.log(RELEASE)

Sentry.init({
    app,
    dsn: import.meta.env.VITE_APP_DSN,
    release: RELEASE,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "my-site-url.com", /^\//],
      }),
    //   new DebugIntegration(
    //     {
    //       // trigger DevTools debugger instead of using console.log
    //       debugger: true,
    
    //       // stringify event before passing it to console.log
    //       stringify: true,
    //     }
    //   )
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
