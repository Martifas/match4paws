import { Paper, Avatar, Typography } from '@mui/material';
import { User } from '@/lib/queries/users';

type UserInfoCardProps = {
  user: User;
  showEmail?: boolean;
  showUserType?: boolean;
  avatarSize?: number;
};

export default function AccountInfoCard({
  user,
  showEmail = true,
  showUserType = true,
  avatarSize = 80,
}: UserInfoCardProps) {
  const getUserTypeLabel = (userType?: string) => {
    switch (userType) {
      case 'petOwner':
        return 'Pet Owner';
      case 'adopter':
        return 'Pet Adopter';
      default:
        return 'User';
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }}>
      <Avatar
        sx={{
          width: avatarSize,
          height: avatarSize,
          mx: 'auto',
          mb: 2,
          bgcolor: '#ed9426',
          fontSize: `${avatarSize / 40}rem`,
        }}
      >
        {user.name?.charAt(0)?.toUpperCase() || 'U'}
      </Avatar>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {user.name || 'User'}
      </Typography>

      {showUserType && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {getUserTypeLabel(user.userType)}
        </Typography>
      )}

      {showEmail && user.email && (
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      )}
    </Paper>
  );
}
