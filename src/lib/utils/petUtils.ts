export const PET_STATUS_COLORS = {
  available: "success",
  pending: "warning",
  adopted: "default",
} as const;

export function getStatusColor(status: string) {
  return (
    PET_STATUS_COLORS[status as keyof typeof PET_STATUS_COLORS] || "default"
  );
}

export function truncateText(text: string, maxLength: number = 100): string {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}
