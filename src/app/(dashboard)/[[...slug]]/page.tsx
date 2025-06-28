import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import { getAuthenticatedUser, handleUserSession } from '@/lib/utils/authUtils';
import Homepage from '@/components/homepage/Homepage';
import { searchPetsSlice } from '@/lib/queries/pets';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default async function Page() {
  const user = await getAuthenticatedUser();
  const { pets } = await searchPetsSlice({}, 1, 4);

  if (user) {
    const onboardingCompleted = await handleUserSession(user.sub);

    if (!onboardingCompleted) {
      redirect('/onboarding');
    }
  }

  return (
    <Box sx={{ pb: 8 }}>
      <Homepage pets={pets} />
    </Box>
  );
}
