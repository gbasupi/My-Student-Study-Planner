import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const emptyForm = {
  module: "",
  task_title: "",
  task_date: "",
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
        task_title: initialData.task_title || "",
        task_date: initialData.task_date || "",
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>ADD STUDY TASK FORM</DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              label="Module"
              name="module"
              value={form.module}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Task Title"
              name="task_title"
              value={form.task_title}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Task Date"
              name="task_date"
              type="date"
              value={form.task_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
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