import { createApp } from "vue";
import type { Plugin } from "vue";
import type { Router } from "vue-router";
import { createPinia } from "pinia";
import { Debounce } from "./Debounce";
import PulseTheme from "@common/utils/PulseTheme";

import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import "primeicons/primeicons.css";
import "@common/assets/base.scss";
import "@common/assets/tailwind.css";

interface VueApp {
  htmlId: string;
  component: any;
  router: Router;
  plugins?: Plugin[];
  withDirectives?: boolean;
}

export const CreateVueApp = async ({
  htmlId,
  component,
  router,
  plugins = [],
}: VueApp) => {
  const app = createApp(component);

  plugins.forEach((item) => {
    app.use(item);
  });

  window.addEventListener(
    "logout",
    Debounce(() => router?.push("/login"))
  );

  app.use(router);
  app.use(createPinia());

  app.use(PrimeVue, {
    theme: {
      name: "aura",
      preset: PulseTheme,
      options: {
        darkModeSelector: ".app-dark",
      },
    },
  });
  app.use(ToastService);
  app.use(ConfirmationService);

  app.mount(htmlId);
};
