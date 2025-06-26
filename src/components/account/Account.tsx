'use client';

import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { ACCOUNT_MENU_ITEMS } from '@/lib/constants/accountMenu';
import useUserProfile from '@/hooks/useUserProfile';

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
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Account
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
            bgcolor: '#ed9426',
            fontSize: '2rem',
          }}
        >
          {user.name?.charAt(0)?.toUpperCase() || 'U'}
        </Avatar>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {user.name || 'User'}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {user.userType === 'petOwner' ? 'Pet Owner' : 'Pet Adopter'}
        </Typography>

        {user.email && (
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        )}
      </Paper>

      <Box sx={{ mt: 2 }}>
        {menuItems.map(item => (
          <Paper key={item.id} sx={{ mb: 2 }}>
            <ListItem
              onClick={item.onClick}
              sx={{
                cursor: 'pointer',
                py: 3,
                px: 3,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                ...(item.isDanger && {
                  color: 'error.main',
                  '&:hover': {
                    backgroundColor: 'error.light',
                    color: 'error.dark',
                  },
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  color: item.isDanger ? 'error.main' : 'inherit',
                  minWidth: 40,
                }}
              >
                <item.IconComponent />
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                }}
              />

              {!item.isDanger && <ChevronRight color="action" />}
            </ListItem>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
