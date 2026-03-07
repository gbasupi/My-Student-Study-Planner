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
import "../styles/Form.css";

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
      maxWidth="md"
      className="form-dialog"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle className="form-title">
          ADD MODULE FORM
        </DialogTitle>

        <DialogContent className="form-content">
          <Stack className="form-stack">
            <TextField
              label="Module Code"
              name="module_code"
              value={form.module_code}
              onChange={handleChange}
              required
              fullWidth
              className="form-field"
            />

            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              fullWidth
              className="form-field"
            />

            <TextField
              select
              label="Semester"
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
              fullWidth
              className="form-field"
            >
              <MenuItem value="1">Semester 1</MenuItem>
              <MenuItem value="2">Semester 2</MenuItem>
              <MenuItem value="3">Semester 3</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions className="form-actions">
          <Button
            onClick={onClose}
            variant="outlined"
            className="form-cancel-btn"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            className="form-submit-btn"
          >
            {initialData ? "Update module" : "Create module"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}