import { useEffect, useState } from "react";
import TableView from "../components/TableView";
import StudyTaskForm from "../forms/StudyTaskForm";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/api";

export default function StudyTasks() {
  const [tasks, setTasks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();

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