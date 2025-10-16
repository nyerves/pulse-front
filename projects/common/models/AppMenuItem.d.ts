export interface AppMenuList {
  label: string;
  icon: string;
  items: AppMenuItem[];
}

export interface AppMenuItem {
  label: string;
  to: string;
  url?: string;
  class?: string;
  target?: string;
  items?: AppMenuItem[];
  visible?: boolean;
  disabled?: boolean;
  command?: (params: MenuItemCommandParams) => void;
}

export interface MenuItemCommandParams {
  originalEvent: MouseEvent;
  item: AppMenuItem;
}
