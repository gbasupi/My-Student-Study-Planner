import { useEffect, useState } from "react";
import TableView from "../components/TableView";
import { getAssignments } from "../api/api";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();

        const statusMap = {
          P: "Pending",
          S: "Submitted",
          G: "Graded",
        };

        const formatted = data.map((assignment) => ({
          id: assignment.id,
          module: assignment.module_code,
          title: assignment.title,
          dueDate: new Date(assignment.due_date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: statusMap[assignment.status] || assignment.status,
          weight: `${assignment.weight}%`,
        }));

        setAssignments(formatted);
      } catch {}
    };

    fetchAssignments();
  }, []);

  return (
    <TableView
      title="Assignments"
      subtitle="Track and manage your assignment now"
      buttonLabel="Add assignment"
      columns={["Module", "Title", "Due Date", "Status", "Weight"]}
      rows={assignments}
    />
  );
}