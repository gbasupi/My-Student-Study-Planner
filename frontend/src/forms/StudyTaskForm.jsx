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
  Chip,
  Typography,
} from "@mui/material";
import { getModules } from "../api/api";

const emptyForm = {
  module: "",
  title: "",
  target_date: "",
  duration_minutes: "",
  is_completed: false,
};

const durations = [
  { label: "15m", value: 15 },
  { label: "30m", value: 30 },
  { label: "45m", value: 45 },
  { label: "1h", value: 60 },
  { label: "1.5h", value: 90 },
  { label: "2h", value: 120 },
  { label: "3h", value: 180 },
];

export default function StudyTaskForm({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState(emptyForm);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await getModules();
        setModules(data);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };

    if (open) {
      fetchModules();
    }
  }, [open]);

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
      [name]: name === "is_completed" ? value === "true" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      module: form.module ? Number(form.module) : null,
      duration_minutes: Number(form.duration_minutes),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialData ? "EDIT STUDY TASK FORM" : "ADD STUDY TASK FORM"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              select
              label="Module"
              name="module"
              value={form.module}
              onChange={handleChange}
              fullWidth
            >
              {modules
                .sort((a, b) => a.module_code.localeCompare(b.module_code))
                .map((module) => (
                  <MenuItem key={module.id} value={module.id}>
                    {module.module_code} — {module.title}
                  </MenuItem>
                ))}
            </TextField>

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

            <Typography variant="subtitle2">Study Duration</Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {durations.map((duration) => (
                <Chip
                  key={duration.value}
                  label={duration.label}
                  clickable
                  color={
                    Number(form.duration_minutes) === duration.value
                      ? "primary"
                      : "default"
                  }
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      duration_minutes: duration.value,
                    }))
                  }
                />
              ))}
            </Stack>

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