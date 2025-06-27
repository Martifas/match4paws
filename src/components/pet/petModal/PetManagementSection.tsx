/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Add, MoreVert, Edit, Delete, Visibility } from '@mui/icons-material';
import AddPetModal from './AddPetModal';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import { truncateText } from '@/lib/utils/petUtils';

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
};

type PetManagementSectionProps = {
  userType: 'petOwner' | 'adopter' | null;
};

export default function PetManagementSection({
  userType,
}: PetManagementSectionProps) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  useEffect(() => {
    if (userType === 'petOwner') {
      fetchPets();
    } else {
      setIsLoading(false);
    }
  }, [userType]);

  if (userType !== 'petOwner') {
    return null;
  }

  const fetchPets = async () => {
    try {
      const response = await fetch('/api/pets');
      if (response.ok) {
        const data = await response.json();
        setPets(data.pets || []);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

    fetchPets();
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

      if (response.ok) {
        fetchPets();
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
    }

    handleMenuClose();
  };

  if (isLoading) {
    return <Typography>Loading your pets...</Typography>;
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          My Pets
        </Typography>
        <div className="w-auto">
          <PrimaryButton
            onClick={() => setIsModalOpen(true)}
            fullWidth={false}
            className="flex items-center gap-2 px-4 py-2"
          >
            <Add fontSize="small" />
            Add Pet
          </PrimaryButton>
        </div>
      </Box>

      {pets.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No pets added yet
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Start by adding your first pet to help them find loving homes
          </Typography>
          <div className="flex justify-center">
            <PrimaryButton
              onClick={() => setIsModalOpen(true)}
              fullWidth={false}
              className="flex items-center gap-2 px-4 py-2"
            >
              <Add fontSize="small" />
              Add Your First Pet
            </PrimaryButton>
          </div>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {pets.map(pet => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pet.id}>
              <Card>
                {pet.images.length > 0 && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={pet.images[0].url}
                    alt={pet.name}
                  />
                )}
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="start"
                  >
                    <Typography variant="h6" component="h3">
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
                    {pet.breed && `${pet.breed} • `}
                    {pet.type} • {pet.ageGroup}
                  </Typography>

                  <Box display="flex" gap={1} mt={1} mb={2}>
                    <Chip label={pet.status} size="small" />
                    <Chip label={pet.size} size="small" variant="outlined" />
                  </Box>

                  {pet.description && (
                    <Typography variant="body2" color="text.secondary">
                      {truncateText(pet.description, 100)}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<Visibility />}>
                    View
                  </Button>
                  <Button size="small" startIcon={<Edit />}>
                    Edit
                  </Button>
                </CardActions>
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
        <MenuItem onClick={handleMenuClose}>
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
