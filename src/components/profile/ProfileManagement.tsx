'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';

import useUserProfile from '@/hooks/useUserProfile';
import Header from '@/components/ui/containers/Header';
import BackButton from '@/components/ui/buttons/BackButton';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import useProfileForm from '@/hooks/useProfileForm';

export default function ProfileManagement() {
  const { user, isLoading } = useUserProfile();

  const initialProfile = useMemo(
    () => ({
      name: user?.name ?? '',
      phone: user?.phone ?? '',
      address: user?.address ?? '',
    }),
    [user?.name, user?.phone, user?.address]
  );

  const {
    fields: form,
    update,
    dirty,
    resetDirty,
  } = useProfileForm(initialProfile);

  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<'ok' | 'err' | null>(null);

  const save = async () => {
    if (!dirty) return;
    setBusy(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setToast('ok');
      resetDirty();
    } catch {
      setToast('err');
    } finally {
      setBusy(false);
    }
  };

  if (isLoading || !user)
    return (
      <Box className="flex justify-center py-20">
        <CircularProgress />
      </Box>
    );

  return (
    <Box className="max-w-lg mx-auto px-4 pb-20 min-h-[90vh] flex flex-col">
      <Header
        left={<BackButton smartNavigation />}
        center={<h1 className="text-lg font-semibold">My Profile</h1>}
      />

      <Box component="form" className="flex flex-col gap-6 mt-6 flex-1">
        <TextField
          label="Full Name"
          required
          value={form.name}
          onChange={e => update('name', e.target.value)}
        />

        <MuiTelInput
          label="Phone"
          required
          defaultCountry="LT"
          value={form.phone}
          onChange={val => update('phone', val)}
        />

        <TextField
          label="Address"
          multiline
          rows={2}
          value={form.address}
          onChange={e => update('address', e.target.value)}
          placeholder="Street, City, ZIP"
        />

        <PrimaryButton
          disabled={busy || !dirty || !form.name.trim() || !form.phone.trim()}
          onClick={save}
        >
          {busy ? 'Saving…' : 'Save Changes'}
        </PrimaryButton>
      </Box>

      <Snackbar
        open={toast !== null}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
      >
        {toast === 'ok' ? (
          <Alert severity="success" sx={{ width: '100%' }}>
            Profile updated!
          </Alert>
        ) : (
          <Alert severity="error" sx={{ width: '100%' }}>
            Something went wrong.
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}
