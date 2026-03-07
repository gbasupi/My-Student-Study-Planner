import { useEffect, useState } from "react";
import TableView from "../components/TableView";
import AssignmentForm from "../forms/AssignmentForm";
import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../api/api";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const fetchAssignments = async () => {
    try {
      const data = await getAssignments();

      const formatted = data.map((assignment) => ({
        id: assignment.id,
        module: assignment.module,
        title: assignment.title,
        due_date: new Date(assignment.due_date).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: assignment.status,
        weight: assignment.weight,
      }));

      setAssignments(formatted);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleOpenForm = (assignment = null) => {
    setSelectedAssignment(assignment);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedAssignment(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedAssignment) {
        await updateAssignment(selectedAssignment.id, formData);
      } else {
        await createAssignment(formData);
      }

      await fetchAssignments();
      handleCloseForm();
    } catch (error) {
      console.error("Failed to save assignment:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteAssignment(row.id);
      await fetchAssignments();
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  return (
    <>
      <TableView
        title="Assignments"
        subtitle="Create and manage your assignments"
        buttonLabel="Add assignment"
        columns={["Module", "Title", "Due Date", "Status", "Weight"]}
        rows={assignments}
        onAdd={() => handleOpenForm()}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
      />

      <AssignmentForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={selectedAssignment}
      />
    </>
  );
}