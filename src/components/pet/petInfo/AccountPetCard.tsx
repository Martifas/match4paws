import { Pet } from '@/lib/types/pets';
import { MoreVert } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

export default function AccountPetCard({
  pet,
  onView,
  onMenuOpen,
}: {
  pet: Pet;
  onView: (id: string) => void;
  onMenuOpen: (e: React.MouseEvent<HTMLElement>, id: string) => void;
}) {
  const info = [pet.breed, pet.type, pet.ageGroup, pet.size]
    .filter(Boolean)
    .join(' • ');

  return (
    <Grid size={{ xs: 6, sm: 6, md: 4 }} key={pet.id}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {!!pet.images.length && (
          <CardMedia
            component="img"
            image={pet.images[0].url}
            alt={pet.name}
            onClick={() => onView(pet.id)}
            sx={{
              width: '100%',
              height: { xs: 160, md: 180 },
              objectFit: 'cover',
              cursor: 'pointer',
              transition: 'opacity .25s',
              '&:hover': { opacity: 0.85 },
            }}
          />
        )}

        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6" noWrap>
              {pet.name}
            </Typography>
            <IconButton size="small" onClick={e => onMenuOpen(e, pet.id)}>
              <MoreVert />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {info}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
