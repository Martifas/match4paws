"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { AGES, GENDERS, PET_TYPES, SIZES } from "@/lib/constants/petSearch";
import { FormSelect } from "@/components/ui/forms/FormSelect";
import { ImageUrlManager } from "@/components/ui/forms/ImageUrlManager";
import { usePetForm, PetFormData } from "@/hooks/usePetForm";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

type AddPetModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (petData: PetFormData) => Promise<void>;
};

export default function AddPetModal({
  open,
  onClose,
  onSubmit,
}: AddPetModalProps) {
  const { formData, isSubmitting, isFormValid, updateField, submitForm } =
    usePetForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(onSubmit, onClose);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Add New Pet
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Pet Name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormSelect
                label="Type"
                value={formData.type}
                onChange={(value) => updateField("type", value)}
                options={PET_TYPES}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Breed"
                value={formData.breed}
                onChange={(e) => updateField("breed", e.target.value)}
                placeholder="e.g., Golden Retriever, Persian"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormSelect
                label="Gender"
                value={formData.gender}
                onChange={(value) => updateField("gender", value)}
                options={GENDERS}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormSelect
                label="Size"
                value={formData.size}
                onChange={(value) => updateField("size", value)}
                options={SIZES}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormSelect
                label="Age Group"
                value={formData.ageGroup}
                onChange={(value) => updateField("ageGroup", value)}
                options={AGES}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Tell potential adopters about this pet's personality, habits, medical needs, etc."
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <ImageUrlManager
                imageUrls={formData.imageUrls}
                onUrlsChange={(urls) => updateField("imageUrls", urls)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <PrimaryButton
            type="submit"
            disabled={!isFormValid || isSubmitting}
            fullWidth={false}
            className="px-6"
          >
            {isSubmitting ? "Adding Pet..." : "Add Pet"}
          </PrimaryButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
