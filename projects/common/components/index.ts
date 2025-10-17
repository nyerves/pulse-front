import { defineAsyncComponent } from "vue";

import AppLayout from "./AppLayout/AppLayout.vue";

const ModalLayout = defineAsyncComponent(
  () => import("./ModalLayout/ModalLayout.vue")
);

const ConfirmationModal = defineAsyncComponent(
  () => import("./ConfirmationModal/ConfirmationModal.vue")
);

const SuccessModal = defineAsyncComponent(
  () => import("./SuccessModal/SuccessModal.vue")
);

export { AppLayout, ModalLayout, ConfirmationModal, SuccessModal };
