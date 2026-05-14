import { AppData, SidebarItem } from './types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { name: 'Android', icon: 'Smartphone', activeColor: '#79B400' },
  { name: 'Windows', icon: 'Monitor' },
  { name: 'Mac', icon: 'Apple' },
  { name: 'Ubuntu', icon: 'Box' },
  { name: 'iPhone', icon: 'Tablet' },
  { name: 'Webapps', icon: 'Cloud' },
  { name: 'Blog', icon: 'PenTool' },
];

export const POPULAR_SEARCHES = [
  'Finanças',
  'Educação',
  'Saúde',
  'Agricultura',
  'Negócios',
  'Transportes',
  'Redes Sociais',
  'Jogos',
  'Ferramentas',
  'Entretenimento',
];

export const TOP_DOWNLOADS: AppData[] = [
  {
    id: '1',
    name: 'TubeMate YouTube',
    developer: 'Devian Studio',
    description: 'The easiest way to download YouTube videos on your Android',
    version: '2.2.6.650',
    iconUrl: 'https://img.utdstc.com/icon/43e/841/43e8417c805a9c379532585292c10b27.png',
    category: 'Video',
  },
  {
    id: '2',
    name: 'VidMate - HD video',
    developer: 'Vidmate Studio',
    description: 'Fast and easily download YouTube music and HD videos',
    version: '2.25',
    iconUrl: 'https://img.utdstc.com/icon/33e/5a1/33e5a1b3b2b4b5b6b7b8b9b0b1b2b3b4.png',
    category: 'Video',
  },
  {
    id: '3',
    name: 'WhatsApp Messenger',
    developer: 'WhatsApp Inc.',
    description: 'The easiest and cheapest way to chat with your friends',
    version: '2.12.544',
    iconUrl: 'https://img.utdstc.com/icon/0a3/5bc/0a35bc3d843843e843843e843843e843.png',
    category: 'Chat',
  },
  {
    id: '4',
    name: 'Lucky Patcher',
    developer: 'Android',
    description: 'Modify app permissions and break the limits',
    version: '6.0.8',
    iconUrl: 'https://img.utdstc.com/icon/1a3/5bc/1a35bc3d843843e843843e843843e843.png',
    category: 'Tools',
  },
  {
    id: '5',
    name: 'Facebook Messenger',
    developer: 'Facebook',
    description: 'The official Facebook Messenger App',
    version: '62.0.0.30.75',
    iconUrl: 'https://img.utdstc.com/icon/2a3/5bc/2a35bc3d843843e843843e843843e843.png',
    category: 'Social',
  },
  {
    id: '6',
    name: 'UC Browser Mini for Android',
    developer: 'UC Web',
    description: 'The fastest browsing experience',
    version: '10.1.4.573',
    iconUrl: 'https://img.utdstc.com/icon/3a3/5bc/3a35bc3d843843e843843e843843e843.png',
    category: 'Browser',
  }
];
