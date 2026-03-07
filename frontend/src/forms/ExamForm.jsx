import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { getModules } from "../api/api";

const emptyForm = {
  module: "",
  name: "",
  exam_date: "",
  location: "",
  notes: "",
};

export default function ExamForm({ open, onClose, onSubmit, initialData }) {
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  const formatDateTimeLocal = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const pad = (n) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

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
      setFormData({
        module: initialData.module || "",
        name: initialData.name || "",
        exam_date: formatDateTimeLocal(initialData.exam_date),
        location: initialData.location || "",
        notes: initialData.notes || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      module: Number(formData.module),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {initialData ? "EDIT EXAM FORM" : "ADD EXAM FORM"}
      </DialogTitle>

      <DialogContent>
        <TextField
          select
          fullWidth
          margin="normal"
          label="Module"
          name="module"
          value={formData.module}
          onChange={handleChange}
          required
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
          fullWidth
          margin="normal"
          label="Exam Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Exam Date"
          name="exam_date"
          type="datetime-local"
          value={formData.exam_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={4}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialData ? "Update Exam" : "Create Exam"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}