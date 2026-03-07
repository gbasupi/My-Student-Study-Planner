import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
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
    onSubmit({
      ...form,
      semester: Number(form.semester),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>ADD MODULE FORM</DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              label="Module Code"
              name="module_code"
              value={form.module_code}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              select
              label="Semester"
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="1">Semester 1</MenuItem>
              <MenuItem value="2">Semester 2</MenuItem>
              <MenuItem value="3"> Semester 3</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            {initialData ? "Update module" : "Create module"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}