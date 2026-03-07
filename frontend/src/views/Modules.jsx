import TableView from "../components/TableViews";

const modules = [
  {
    id: 1,
    code: "COMPSCI5100",
    title:
      "Machine Learning & Artificial Intelligence for Data Scientists",
    semester: "1",
  },
  {
    id: 2,
    code: "COMPSCI4084",
    title: "Programming and Systems Development",
    semester: "1",
  },
];

export default function Modules() {
  return (
    <TableView
      title="Modules"
      subtitle="Create and manage your modules"
      buttonLabel="Add module"
      columns={["Module Code", "Title", "Semester"]}
      rows={modules}
    />
  );
}