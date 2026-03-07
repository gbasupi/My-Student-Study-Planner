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
  due_date: "",
  status: "P",
  weight: "",
};

export default function AssignmentForm({
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
        due_date: initialData.due_date
          ? initialData.due_date.slice(0, 16)
          : "",
        status: initialData.status || "P",
        weight: initialData.weight || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      module: Number(form.module),
      weight: Number(form.weight),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>ADD ASSIGNMENT FORM</DialogTitle>

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
              label="Assignment Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Due Date"
              name="due_date"
              type="datetime-local"
              value={form.due_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />

            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="P">Pending</MenuItem>
              <MenuItem value="S">Submitted</MenuItem>
              <MenuItem value="G">Graded</MenuItem>
            </TextField>

            <TextField
              label="Weight (%)"
              name="weight"
              type="number"
              value={form.weight}
              onChange={handleChange}
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
            {initialData ? "Update assignment" : "Create assignment"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}