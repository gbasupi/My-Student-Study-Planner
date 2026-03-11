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

      const statusMap = {
        P: "Pending",
        S: "Submitted",
        G: "Graded",
      };

      const formatted = data.map((assignment) => ({
        id: assignment.id,

        // values for table display
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

        // raw values for edit form
        module_id: assignment.module,
        due_date: assignment.due_date,
        status_code: assignment.status,
        weight_value: assignment.weight,
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
    if (assignment) {
      setSelectedAssignment({
        id: assignment.id,
        module: assignment.module_id,
        title: assignment.title,
        due_date: assignment.due_date,
        status: assignment.status_code,
        weight: assignment.weight_value,
      });
    } else {
      setSelectedAssignment(null);
    }

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
        columns={[
          { key: "module", label: "Module" },
          { key: "title", label: "Title" },
          { key: "dueDate", label: "Due Date" },
          { key: "status", label: "Status" },
          { key: "weight", label: "Weight" },
        ]}
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