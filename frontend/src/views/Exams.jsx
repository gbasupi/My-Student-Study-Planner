// Exams.jsx - Main view for managing exams, including CRUD operations and displaying in a table.
import { useEffect, useState } from "react";
import TableView from "../components/TableView";
import ExamForm from "../forms/ExamForm";
import {
  getExams,
  createExam,
  updateExam,
  deleteExam,
} from "../api/api";

// Main component for the Exams view
export default function Exams() {
  const [exams, setExams] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const fetchExams = async () => {
    try {
      const data = await getExams();

      // Data for display in the table
      const formatted = data.map((exam) => ({
        id: exam.id,
        module: exam.module_code,
        module_id: exam.module,
        name: exam.name,
        exam_date: exam.exam_date,
        location: exam.location,
        notes: exam.notes || "",
        examDate: new Date(exam.exam_date).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setExams(formatted);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Open the form for creating a new exam or editing an existing one.
  const handleOpenForm = (exam = null) => {
    if (exam) {
      setSelectedExam({
        ...exam,
        module: exam.module_id,
      });
    } else {
      setSelectedExam(null);
    }

    setOpenForm(true);
  };

  // Close the form and reset selected exam
  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedExam(null);
  };

  // Handle form submission for creating or updating an exam
  const handleSubmit = async (formData) => {
    try {
      if (selectedExam) {
        await updateExam(selectedExam.id, formData);
      } else {
        await createExam(formData);
      }

      await fetchExams();
      handleCloseForm();
    } catch (error) {
      console.error("Failed to save exam:", error);
    }
  };

  // Handle deleting an exam
  const handleDelete = async (row) => {
    try {
      await deleteExam(row.id);
      await fetchExams();
    } catch (error) {
      console.error("Failed to delete exam:", error);
    }
  };

  return (
    <>
      <TableView
        title="Exams"
        subtitle="Upcoming exams and revision planning"
        buttonLabel="Add exam"
        columns={[
  { key: "module", label: "Module" },
  { key: "name", label: "Name" },
  { key: "examDate", label: "Exam Date" },
  { key: "location", label: "Location" },
]}
        rows={exams.map((exam) => ({
          id: exam.id,
          module: exam.module,
          module_id: exam.module_id,
          name: exam.name,
          examDate: exam.examDate,
          exam_date: exam.exam_date,
          location: exam.location,
          notes: exam.notes,
        }))}
        onAdd={() => handleOpenForm()}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
      />

      <ExamForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={selectedExam}
      />
    </>
  );
}