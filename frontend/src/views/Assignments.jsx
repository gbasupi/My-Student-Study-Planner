import TableView from "../components/TableViews";

const assignments = [
  {
    id: 1,
    module: "COMPSCI5100",
    title: "Coursework 1",
    dueDate: "2026-03-28 23:59",
    status: "Pending",
    weight: "30%",
  },
  {
    id: 2,
    module: "COMPSCI4084",
    title: "Systems Report",
    dueDate: "2026-04-10 17:00",
    status: "Submitted",
    weight: "40%",
  },
];

export default function Assignments() {
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