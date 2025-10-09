import { defineAsyncComponent } from "vue";

import AppLayout from "./AppLayout/AppLayout.vue";
const ModalLayout = defineAsyncComponent(() => import("./ModalLayout/ModalLayout.vue"));

export { AppLayout, ModalLayout };
