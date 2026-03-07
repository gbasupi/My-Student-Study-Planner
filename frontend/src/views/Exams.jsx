import { useEffect, useState } from "react";
import TableView from "../components/TableViews";
import { getExams } from "../api/api";

export default function Exams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getExams();

        const formatted = data.map((exam) => ({
          id: exam.id,
          module: exam.module_code,
          name: exam.name,
          examDate: new Date(exam.exam_date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          location: exam.location,
        }));

        setExams(formatted);
      } catch {}
    };

    fetchExams();
  }, []);

  return (
    <TableView
      title="Exams"
      subtitle="Upcoming exams and revision planning"
      buttonLabel="Add exam"
      columns={["Module", "Name", "Exam Date", "Location"]}
      rows={exams}
    />
  );
}