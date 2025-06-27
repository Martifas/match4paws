import { Pets, Person, Logout } from '@mui/icons-material';

export const PET_OWNER_MENU_ITEMS = [
  {
    id: 'petManagement',
    label: 'My Pet Management',
    IconComponent: Pets,
    route: '/account/petmanagement',
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

export const PET_ADOPTER_MENU_ITEMS = [
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
