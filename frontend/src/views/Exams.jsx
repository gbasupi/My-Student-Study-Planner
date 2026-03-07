import TableView from "../components/TableViews";

const exams = [
  {
    id: 1,
    module: "COMPSCI5100",
    name: "Final Exam",
    examDate: "2026-05-12 09:00",
    location: "Boyd Orr Building",
  },
  {
    id: 2,
    module: "COMPSCI4084",
    name: "Midterm Exam",
    examDate: "2026-04-02 14:00",
    location: "James Watt South",
  },
];

export default function Exams() {
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