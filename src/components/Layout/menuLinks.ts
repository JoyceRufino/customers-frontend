import { type LucideIcon, Home, User } from "lucide-react";

export interface MenuLink {
  label: string;
  path: string;
  icon?: LucideIcon;
  showInHeader?: boolean;
  showInFooter?: boolean;
}

export const menuLinks: MenuLink[] = [
  {
    label: "Home",
    path: "/",
    icon: Home,
    showInHeader: false,
    showInFooter: false,
  },
  {
    label: "Clientes",
    path: "/customers",
    icon: User,
    showInHeader: true,
    showInFooter: true,
  },
  {
    label: "Clientes Selecionados",
    path: "/customers-selected",
    icon: User,
    showInHeader: true,
    showInFooter: true,
  },
];
