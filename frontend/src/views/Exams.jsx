import { useEffect, useState } from "react";
import TableView from "../components/TableView";
import ExamForm from "../forms/ExamForm";
import {
  getExams,
  createExam,
  updateExam,
  deleteExam,
} from "../api/api";

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const fetchExams = async () => {
    try {
      const data = await getExams();

      const formatted = data.map((exam) => ({
        id: exam.id,
        module: exam.module_code,
        title: exam.title,
        exam_date: exam.exam_date,
      }));

      setExams(formatted);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleOpenForm = (exam = null) => {
    setSelectedExam(exam);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedExam(null);
  };

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
        subtitle="Create and manage your exams"
        buttonLabel="Add exam"
        columns={["Module", "Title", "Exam Date"]}
        rows={exams}
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