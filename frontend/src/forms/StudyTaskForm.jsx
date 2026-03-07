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
  module: "",
  title: "",
  target_date: "",
  duration_minutes: "",
  is_completed: false,
};

export default function StudyTaskForm({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        module: initialData.module || "",
        title: initialData.title || "",
        target_date: initialData.target_date || "",
        duration_minutes: initialData.duration_minutes || "",
        is_completed: initialData.is_completed ?? false,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "is_completed"
          ? value === "true"
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      module: Number(form.module),
      duration_minutes: Number(form.duration_minutes),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>ADD STUDY TASK FORM</DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              label="Module ID"
              name="module"
              type="number"
              value={form.module}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Task Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Target Date"
              name="target_date"
              type="date"
              value={form.target_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />

            <TextField
              label="Duration (minutes)"
              name="duration_minutes"
              type="number"
              value={form.duration_minutes}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              select
              label="Completed"
              name="is_completed"
              value={String(form.is_completed)}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="false">No</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            {initialData ? "Update task" : "Create task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}