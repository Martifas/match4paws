import { Box, Typography } from '@mui/material';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  marginBottom?: number;
};

export default function AccountHeader({
  title,
  subtitle,
  centered = true,
  marginBottom = 3,
}: PageHeaderProps) {
  return (
    <Box textAlign={centered ? 'center' : 'left'} mb={marginBottom}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
