import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import TableView from "../components/TableView";
import StudyTaskForm from "../forms/StudyTaskForm";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/api";

function StatCard({ label, value, color }) {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        p: 3,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        bgcolor: "#fff",
      }}
    >
      <Typography sx={{ fontSize: 14, color: "#6b7280", mb: 1 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 32, fontWeight: 700, color }}>
        {value}
      </Typography>
    </Paper>
  );
}

export default function StudyTasks() {
  const [tasks, setTasks] = useState([]);
  const [rawTasks, setRawTasks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setRawTasks(data);

      const formatted = data.map((task) => ({
        id: task.id,
        module: task.module_code,
        title: task.title,
        targetDate: new Date(task.target_date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        duration: `${task.duration_minutes} mins`,
        completed: task.is_completed ? "Yes" : "No",
      }));

      setTasks(formatted);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Stat calculations
  const totalMinutes = rawTasks.reduce((sum, t) => sum + (t.duration_minutes || 0), 0);
  const completedMinutes = rawTasks
    .filter((t) => t.is_completed === true || t.is_completed === "true")
    .reduce((sum, t) => sum + (t.duration_minutes || 0), 0);
  const completionRate =
    totalMinutes > 0 ? Math.round((completedMinutes / totalMinutes) * 100) : 0;

  const toHours = (mins) => (mins / 60).toFixed(1) + "h";

  const handleOpenForm = (task = null) => {
    setSelectedTask(task);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedTask(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, formData);
      } else {
        await createTask(formData);
      }
      await fetchTasks();
      handleCloseForm();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteTask(row.id);
      await fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <StatCard
          label="Total Study Hours Planned"
          value={toHours(totalMinutes)}
          color="#3b82f6"
        />
        <StatCard
          label="Study Hours Completed"
          value={toHours(completedMinutes)}
          color="#22c55e"
        />
        <StatCard
          label="Completion Rate"
          value={`${completionRate}%`}
          color="#a855f7"
        />
      </Box>

      <TableView
        title="Study Tasks"
        subtitle="Create and manage your study tasks"
        buttonLabel="Add study task"
        columns={[
          { key: "module", label: "Module" },
          { key: "title", label: "Title" },
          { key: "targetDate", label: "Target Date" },
          { key: "duration", label: "Duration" },
          { key: "completed", label: "Completed" },
        ]}
        rows={tasks}
        onAdd={() => handleOpenForm()}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
      />

      <StudyTaskForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={selectedTask}
      />
    </>
  );
}
