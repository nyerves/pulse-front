<script setup lang="ts">
import { ref } from "vue";
import type { AppMenuList } from "@common/models";
import AppMenuItem from "./AppMenuItem.vue";

const appMenuList = ref<AppMenuList[]>([
  {
    label: "Home",
    items: [{ label: "Inicio", icon: "pi pi-fw pi-home", to: "/dashboard" }],
  },
  {
    label: "Catálogos especiales",
    items: [
      {
        label: "CIE-I0",
        icon: "pi pi-fw pi-id-card",
        to: "/uikit/formlayout",
      },
      {
        label: "Procedimientos",
        icon: "pi pi-fw pi-check-square",
        to: "/uikit/input",
      },
      { label: "Medicamentos", icon: "pi pi-fw pi-table", to: "/uikit/table" },
      { label: "CAUSES", icon: "pi pi-fw pi-list", to: "/uikit/list" },
      {
        label: "Bienes Terapéuticos",
        icon: "pi pi-fw pi-share-alt",
        to: "/uikit/tree",
      },
      { label: "Patologías", icon: "pi pi-fw pi-tablet", to: "/uikit/panel" },
    ],
  },
  {
    label: "Catálogos generales",
    items: [
      {
        label: "Unidades Médicas",
        icon: "pi pi-fw pi-building",
        to: "/uikit/menumodel",
      },
      {
        label: "Especialidades Médicas",
        icon: "pi pi-fw pi-briefcase",
        to: "/uikit/overlays",
      },
      {
        label: "Médicos",
        icon: "pi pi-fw pi-user",
        to: "/uikit/menus",
      },
      {
        label: "Pacientes",
        icon: "pi pi-fw pi-users",
        to: "/uikit/messages",
      },
    ],
  },
  {
    label: "Administración",
    items: [
      {
        label: "Usuarios",
        icon: "pi pi-fw pi-user-edit",
        to: "/admin/users",
      },
      {
        label: "Roles",
        icon: "pi pi-fw pi-users",
        to: "/admin/roles",
      },
      {
        label: "Permisos",
        icon: "pi pi-fw pi-shield",
        to: "/admin/permissions",
      },
    ],
  },
]);
</script>

<template>
  <div class="layout-sidebar">
    <ul class="layout-menu">
      <template v-for="(item, i) in appMenuList" :key="item">
        <AppMenuItem :item="item" :index="i" />
      </template>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
