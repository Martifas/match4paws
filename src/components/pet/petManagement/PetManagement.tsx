'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
} from '@mui/material';
import { Add, MoreVert, Edit, Delete } from '@mui/icons-material';
import useUserProfile from '@/hooks/useUserProfile';
import AddPetModal from '@/components/pet/petModal/AddPetModal';
import AccountHeader from '@/components/account/AccountHeader';
import BackButton from '@/components/ui/buttons/BackButton';
import Header from '@/components/ui/containers/Header';

type Pet = {
  id: string;
  name: string;
  type: string;
  breed?: string;
  gender: string;
  size: string;
  ageGroup: string;
  description?: string;
  status: string;
  images: { url: string; orderIdx: number }[];
  createdAt: string;
  updatedAt: string;
};

export default function PetManagement() {
  const router = useRouter();
  const { user, isLoading } = useUserProfile();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoadingPets, setIsLoadingPets] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user && user.userType !== 'petOwner') {
      router.push('/account');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchPets = async () => {
      if (!user?.id) return;

      try {
        setError(null);
        const response = await fetch('/api/pets');

        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }

        const data = await response.json();
        setPets(data.pets || []);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setError('Failed to load your pets');
      } finally {
        setIsLoadingPets(false);
      }
    };

    if (user?.userType === 'petOwner') {
      fetchPets();
    }
  }, [user]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddPet = async (petData: any) => {
    try {
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

      const updatedResponse = await fetch('/api/pets');
      if (updatedResponse.ok) {
        const data = await updatedResponse.json();
        setPets(data.pets || []);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding pet:', error);
      setError('Failed to add pet');
    }
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    petId: string
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedPetId(petId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedPetId(null);
  };

  const handleDeletePet = async () => {
    if (!selectedPetId) return;

    try {
      const response = await fetch(`/api/pets/${selectedPetId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }

      setPets(pets.filter(pet => pet.id !== selectedPetId));
      handleMenuClose();
    } catch (error) {
      console.error('Error deleting pet:', error);
      setError('Failed to delete pet');
    }
  };

  const handleViewPet = (petId: string) => {
    router.push(`/pet/${petId}`);
  };

  const handleEditPet = (petId: string) => {
    console.log('Edit pet:', petId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'pending':
        return 'warning';
      case 'adopted':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatPetInfo = (pet: Pet) => {
    const parts = [];
    if (pet.breed) parts.push(pet.breed);
    parts.push(pet.type);
    parts.push(pet.ageGroup);
    return parts.join(' • ');
  };

  if (isLoading || isLoadingPets) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!user || user.userType !== 'petOwner') {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <Typography>
          Access denied. Only pet owners can access this page.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Header
        left={<BackButton smartNavigation />}
        center={
          <AccountHeader
            title="My Pet Management"
            subtitle="Manage your pets looking for loving homes"
            centered={true}
          />
        }
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6">
          {pets.length} {pets.length === 1 ? 'Pet' : 'Pets'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsModalOpen(true)}
          sx={{
            backgroundColor: '#ed9426',
            '&:hover': { backgroundColor: '#d4841f' },
          }}
        >
          Add Pet
        </Button>
      </Box>

      {pets.length === 0 ? (
        <Card sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No pets added yet
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Start by adding your first pet to help them find loving homes
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setIsModalOpen(true)}
            sx={{
              backgroundColor: '#ed9426',
              '&:hover': { backgroundColor: '#d4841f' },
            }}
          >
            Add Your First Pet
          </Button>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {pets.map(pet => (
            <Grid size={{ xs: 6, sm: 6, md: 4 }} key={pet.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {pet.images.length > 0 && (
                  <Box
                    sx={{
                      width: '100%',
                      height: { xs: 160, md: 180 },
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      mb: 0,
                    }}
                  >
                    <CardMedia
                      onClick={() => handleViewPet(pet.id)}
                      component="img"
                      image={pet.images[0].url}
                      alt={pet.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        transition: 'opacity 0.25s ease',
                        '&:hover': {
                          opacity: 0.85,
                        },
                      }}
                    />
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="start"
                    mb={1}
                  >
                    <Typography variant="h6" component="h3" noWrap>
                      {pet.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={e => handleMenuOpen(e, pet.id)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {formatPetInfo(pet)}
                  </Typography>

                  <Box display="flex" gap={1} mt={1} mb={2} flexWrap="wrap">
                    <Chip
                      label={pet.status}
                      size="small"
                      color={getStatusColor(pet.status)}
                    />
                    <Chip label={pet.size} size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleEditPet(selectedPetId!);
            handleMenuClose();
          }}
        >
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeletePet} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <AddPetModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPet}
      />
    </Box>
  );
}
