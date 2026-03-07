import { useEffect, useState } from "react";
import TableView from "../components/TableView";
import { getTasks } from "../api/api";

export default function StudyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
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
      } catch {}
    };

    fetchTasks();
  }, []);

  return (
    <TableView
      title="Study Tasks"
      subtitle="Plan and track your study sessions"
      buttonLabel="Add task"
      columns={["Module", "Title", "Target Date", "Duration", "Completed"]}
      rows={tasks}
    />
  );
}