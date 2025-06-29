'use client';

import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Menu,
  MenuItem,
  Alert,
  Pagination,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import useUserProfile from '@/hooks/useUserProfile';
import usePets from '@/hooks/usePets';
import MultiToggleChip from '@/components/ui/buttons/MultiToggleChip';
import AccountHeader from '@/components/account/AccountHeader';
import BackButton from '@/components/ui/buttons/BackButton';
import Header from '@/components/ui/containers/Header';
import AddPetModal, {
  PetFormValues,
} from '@/components/pet/petModal/AddPetModal';
import AccountPetCard from '../petInfo/AccountPetCard';
import { PAGE_SIZE, PET_FILTERS } from '@/lib/constants/pet';

export default function PetManagementPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, isLoading: isLoadingUser } = useUserProfile();
  const [addOpen, setAddOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<
    null | (PetFormValues & { id: string })
  >(null);

  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);
  const [menuPet, setMenuPet] = useState<string | null>(null);

  const page = Number(params.get('page') ?? 1);
  const filters = useMemo(
    () => (params.get('filters') ?? '').split(',').filter(Boolean),
    [params]
  );
  const pushState = useCallback(
    (nextPage: number, nextFilters: string[]) => {
      const qs = new URLSearchParams();
      if (nextPage > 1) qs.set('page', String(nextPage));
      if (nextFilters.length) qs.set('filters', nextFilters.join(','));
      router.replace(`?${qs}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    if (!isLoadingUser && user && user.userType !== 'petOwner') {
      router.push('/account');
    }
  }, [user, isLoadingUser, router]);

  const { pets, totalCount, isLoading, error, refetch } = usePets(
    user?.id,
    page,
    filters
  );

  useCallback(() => {
    refetch();
    pushState(1, filters);
  }, [refetch, pushState, filters]);

  const savePet = async (data: PetFormValues, id?: string) => {
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `/api/pets/${id}` : '/api/pets';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      refetch();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/pets/${id}`, { method: 'DELETE' });
    if (res.ok) {
      refetch();
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  if (isLoadingUser || isLoading)
    return (
      <Box p={3} textAlign="center">
        <Typography>Loading…</Typography>
      </Box>
    );
  if (!user || user.userType !== 'petOwner')
    return (
      <Box p={3} textAlign="center">
        <Typography>Access denied.</Typography>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Header
        left={<BackButton smartNavigation />}
        center={
          <AccountHeader
            title="My Pet Management"
            subtitle="Manage your pets looking for loving homes"
            centered
          />
        }
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box mb={3}>
        <MultiToggleChip
          items={PET_FILTERS}
          selected={filters}
          onChange={next => pushState(1, next)}
          render={i => i.label}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          mb: 3,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', mr: 2 }}>
          {totalCount} {totalCount === 1 ? 'Pet' : 'Pets'}
        </Typography>

        {totalPages > 1 && (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, p) => pushState(p, filters)}
              shape="rounded"
              size="small"
            />
          </Box>
        )}

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddOpen(true)}
          sx={{
            ml: 2,
            whiteSpace: 'nowrap',
            backgroundColor: '#ed9426',
            '&:hover': { backgroundColor: '#d4841f' },
          }}
        >
          Add Pet
        </Button>
      </Box>

      {pets.length === 0 ? (
        <Card sx={{ p: 6, textAlign: 'center' }}>
          <Typography>No pets match your filters</Typography>
        </Card>
      ) : (
        <Grid container spacing={2} pb={6}>
          {pets.map(pet => (
            <AccountPetCard
              key={pet.id}
              pet={pet}
              onView={id => router.push(`/pet/${id}`)}
              onMenuOpen={(e, id) => {
                setMenuEl(e.currentTarget);
                setMenuPet(id);
              }}
            />
          ))}
        </Grid>
      )}

      <Menu anchorEl={menuEl} open={!!menuEl} onClose={() => setMenuEl(null)}>
        <MenuItem
          onClick={() => {
            const petRow = pets.find(p => p.id === menuPet);
            if (petRow) {
              const {
                id,
                name,
                type,
                breed,
                gender,
                size,
                ageGroup,
                description,
                images,
              } = petRow;

              setEditingPet({
                id,
                name,
                type,
                breed: breed ?? '',
                gender,
                size,
                ageGroup,
                description: description ?? '',
                imageUrls: images.map(img => img.url),
              });
            }

            setMenuEl(null);
          }}
        >
          <Edit sx={{ mr: 1 }} fontSize="small" /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (menuPet) handleDelete(menuPet);
            setMenuEl(null);
          }}
          sx={{ color: 'error.main' }}
        >
          <Delete sx={{ mr: 1 }} fontSize="small" /> Delete
        </MenuItem>
      </Menu>

      <AddPetModal
        open={addOpen || !!editingPet}
        pet={editingPet ?? undefined}
        onClose={() => {
          setAddOpen(false);
          setEditingPet(null);
        }}
        onSubmit={savePet}
      />
    </Box>
  );
}
