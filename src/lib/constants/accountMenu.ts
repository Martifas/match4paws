import { Pets, Person, Logout } from '@mui/icons-material';

export const PET_OWNER_MENU_ITEMS = [
  {
    id: 'petManagement',
    label: 'My Pet Management',
    IconComponent: Pets,
    route: '/account/petManagement',
    isDanger: false,
  },
  {
    id: 'profile',
    label: 'Edit my profile',
    IconComponent: Person,
    route: '/account/profileManagement',
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
    id: 'profile',
    label: 'Edit my profile',
    IconComponent: Person,
    route: '/account/profileManagement',
    isDanger: false,
  },
  {
    id: 'logout',
    label: 'Logout',
    IconComponent: Logout,
    isDanger: true,
  },
] as const;
