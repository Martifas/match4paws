import { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

type ImageUrlManagerProps = {
  imageUrls: string[];
  onUrlsChange: (urls: string[]) => void;
  label?: string;
};

export function ImageUrlManager({
  imageUrls,
  onUrlsChange,
  label = "Photo URLs",
}: ImageUrlManagerProps) {
  const [currentUrl, setCurrentUrl] = useState("");

  const addUrl = () => {
    if (currentUrl.trim() && !imageUrls.includes(currentUrl.trim())) {
      onUrlsChange([...imageUrls, currentUrl.trim()]);
      setCurrentUrl("");
    }
  };

  const removeUrl = (urlToRemove: string) => {
    onUrlsChange(imageUrls.filter((url) => url !== urlToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addUrl();
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>

      <Box display="flex" gap={1} mb={2}>
        <TextField
          fullWidth
          placeholder="Enter image URL"
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="outlined"
          onClick={addUrl}
          disabled={!currentUrl.trim()}
          sx={{ minWidth: "auto", px: 2 }}
        >
          Add
        </Button>
      </Box>

      {imageUrls.length > 0 && (
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Added photos ({imageUrls.length}):
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {imageUrls.map((url, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={1}
                border="1px solid #e0e0e0"
                borderRadius={1}
              >
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "300px",
                  }}
                >
                  {url}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => removeUrl(url)}
                  color="error"
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
