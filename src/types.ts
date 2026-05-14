export interface AppData {
  id: string;
  name: string;
  developer: string;
  description: string;
  version: string;
  iconUrl: string;
  category: string;
}

export interface SidebarItem {
  name: string;
  icon: string; // lucide icon name
  activeColor?: string;
}
