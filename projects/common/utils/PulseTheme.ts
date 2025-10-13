import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const PulseTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#F0FDFA",
      100: "#CCFBF1",
      200: "#99F6E4",
      300: "#5EEAD4",
      400: "#2DD4BF",
      500: "#14B8A6",
      600: "#0D9488" /* ← tu color primario */,
      700: "#0F766E",
      800: "#115E59",
      900: "#134E4A",
      950: "#042F2E",
    },
    colorScheme: {
      light: {
        surface: {
          0: "#FFFFFF",
          50: "#F9FAFB" /* Fondo */,
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563" /* Texto secundario */,
          700: "#374151",
          800: "#1F2937",
          900: "#111827" /* Texto principal */,
        },
        primary: {
          color: "#0D9488",
          inverseColor: "#FFFFFF",
          hoverColor: "#0F766E",
          activeColor: "#115E59",
        },
        highlight: {
          background: "#0D948822",
          focusBackground: "#0F766E33",
          color: "#111827",
          focusColor: "#111827",
        },
        info: {
          color: "#10B981" /* Azul/Verde alerta */,
        },
        warning: {
          color: "#F59E0B" /* Amarillo alerta */,
        },
        danger: {
          color: "#EF4444" /* Rojo alerta */,
        },
      },
      dark: {
        primary: {
          color: "#0D9488", // Nuevo color primario en oscuro
          inverseColor: "#0F172A", // Texto o ícono sobre el primario
          hoverColor: "#14B8A6", // Hover
          activeColor: "#0D9488", // Active
        },
      },
    },
  },
});

export default PulseTheme;
