import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  Box,
} from "@mui/material";

const emptyForm = {
  module_code: "",
  title: "",
  semester: "",
};

export default function ModuleForm({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        module_code: initialData.module_code || "",
        title: initialData.title || "",
        semester: initialData.semester || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: "#f9fafb",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <DialogTitle sx={{ p: 0 }}>
          <Box
            sx={{
              px: 3,
              py: 2.5,
              background: "linear-gradient(135deg, #2f56d9 0%, #4b8df8 100%)",
              color: "#fff",
            }}
          >
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 0.4,
              }}
            >
              ADD MODULE FORM
            </Typography>
          </Box>
        </DialogTitle>

        {/* Form fields */}
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={2.5}>
            <TextField
              label="Module Code"
              name="module_code"
              value={form.module_code}
              onChange={handleChange}
              placeholder="COMPSCI5012"
              required
              fullWidth
            />

            <TextField
              label="Module Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Internet Technology"
              required
              fullWidth
            />

            <TextField
              label="Semester"
              name="semester"
              value={form.semester}
              onChange={handleChange}
              placeholder="1"
              required
              fullWidth
            />
          </Stack>
        </DialogContent>

        {/* Buttons */}
        <DialogActions
          sx={{
            px: 3,
            pb: 2.5,
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              backgroundColor: "#ef4444",
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#dc2626",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#2563eb",
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1d4ed8",
              },
            }}
          >
            {initialData ? "Update Module" : "Create Module"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}