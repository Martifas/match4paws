import { Pets, Person, Logout } from '@mui/icons-material';

export const ACCOUNT_MENU_ITEMS = [
  {
    id: 'preferences',
    label: 'My Pet Preferences',
    IconComponent: Pets,
    route: '/account/preferences',
    isDanger: false,
  },
  {
    id: 'profile',
    label: 'My Profile',
    IconComponent: Person,
    route: '/account/profile',
    isDanger: false,
  },
  {
    id: 'logout',
    label: 'Logout',
    IconComponent: Logout,
    isDanger: true,
  },
] as const;
