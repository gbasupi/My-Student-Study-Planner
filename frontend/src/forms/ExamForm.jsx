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
  name: "",
  exam_date: "",
  location: "",
  notes: "",
};

export default function ExamForm({
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
        name: initialData.name || "",
        exam_date: initialData.exam_date
          ? initialData.exam_date.slice(0, 16)
          : "",
        location: initialData.location || "",
        notes: initialData.notes || "",
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
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>ADD EXAM FORM</DialogTitle>

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
              label="Exam Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Exam Date"
              name="exam_date"
              type="datetime-local"
              value={form.exam_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />

            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            {initialData ? "Update exam" : "Create exam"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}