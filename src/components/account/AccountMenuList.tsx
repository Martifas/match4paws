/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

type MenuItem = {
  id: string;
  label: string;
  IconComponent: any;
  onClick: () => void;
  isDanger?: boolean;
};

type MenuListProps = {
  items: MenuItem[];
  spacing?: number;
  showChevron?: boolean;
  containerSpacing?: number;
};

export default function AcccountMenuList({
  items,
  spacing = 2,
  showChevron = true,
  containerSpacing = 2,
}: MenuListProps) {
  return (
    <Box sx={{ mt: containerSpacing }}>
      {items.map(item => (
        <Paper key={item.id} sx={{ mb: spacing }}>
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

            {showChevron && !item.isDanger && <ChevronRight color="action" />}
          </ListItem>
        </Paper>
      ))}
    </Box>
  );
}
