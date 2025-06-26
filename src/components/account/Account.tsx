'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { ACCOUNT_MENU_ITEMS } from '@/lib/constants/accountMenu';
import useUserProfile from '@/hooks/useUserProfile';
import AccountInfoCard from './AccountInfoCard';
import AcccountMenuList from './AccountMenuList';
import AccountHeader from './AccountHeader';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading } = useUserProfile();

  const handleLogout = async () => {
    router.push('/auth/logout');
  };

  const menuItems = ACCOUNT_MENU_ITEMS.map(item => ({
    ...item,
    onClick:
      item.id === 'logout' ? handleLogout : () => router.push(item.route!),
  }));

  if (isLoading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <Typography>Unable to load user profile</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <AccountHeader title="Account" />

      <AccountInfoCard user={user} />

      <AcccountMenuList items={menuItems} />
    </Box>
  );
}
