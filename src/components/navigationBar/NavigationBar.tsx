/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Fab, Box } from '@mui/material';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import PetsIcon from '@mui/icons-material/Pets';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authProvider';
import AddPetModal from '@/components/pet/petModal/AddPetModal';
import { User } from '@/lib/queries/users';

export default function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const authUser = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const routes = ['/', '/favorites', '/messages', '/account'];
  const current = Math.max(routes.indexOf(pathname), 0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authUser?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [authUser?.id]);

  const handleAddPet = async (petData: any) => {
    const response = await fetch('/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });

    if (!response.ok) {
      throw new Error('Failed to add pet');
    }

    router.push('/');
  };

  if (isLoading || !authUser?.id) {
    return (
      <Box
        sx={{ width: '100%', maxWidth: theme => theme.breakpoints.values.md }}
      >
        <BottomNavigation
          showLabels
          value={current}
          onChange={(_, i) => router.push(routes[i])}
          sx={{ width: '100%' }}
        >
          <BottomNavigationAction label="Home" icon={<HomeFilledIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
          <BottomNavigationAction label="Account" icon={<PersonIcon />} />
        </BottomNavigation>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: theme => theme.breakpoints.values.md,
      }}
    >
      <BottomNavigation
        showLabels
        value={current}
        onChange={(_, i) => router.push(routes[i])}
        sx={{
          width: '100%',
          '& .MuiBottomNavigationAction-root': {
            ...((user?.userType === 'petOwner' ||
              user?.userType === 'adopter') && {
              '&:nth-of-type(1), &:nth-of-type(2)': {
                marginRight: '28px',
              },
              '&:nth-of-type(3), &:nth-of-type(4)': {
                marginLeft: '28px',
              },
            }),
          },
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeFilledIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
        <BottomNavigationAction label="Account" icon={<PersonIcon />} />
      </BottomNavigation>

      {user?.userType === 'petOwner' && (
        <Fab
          size="small"
          color="primary"
          onClick={() => setIsAddPetModalOpen(true)}
          sx={{
            position: 'absolute',
            top: -28,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ed9426',
            '&:hover': {
              backgroundColor: '#d4841f',
            },
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(237, 148, 38, 0.4)',
          }}
        >
          <AddIcon />
        </Fab>
      )}

      {user?.userType === 'adopter' && (
        <Fab
          size="small"
          color="primary"
          onClick={() => router.push('/search')}
          sx={{
            position: 'absolute',
            top: -28,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ed9426',
            '&:hover': {
              backgroundColor: '#d4841f',
            },
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(237, 148, 38, 0.4)',
          }}
        >
          <PetsIcon />
        </Fab>
      )}

      {user?.userType === 'petOwner' && (
        <AddPetModal
          open={isAddPetModalOpen}
          onClose={() => setIsAddPetModalOpen(false)}
          onSubmit={handleAddPet}
        />
      )}
    </Box>
  );
}
