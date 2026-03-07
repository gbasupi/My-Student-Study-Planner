import TableView from "../components/TableViews";

const studyTasks = [
  {
    id: 1,
    module: "COMPSCI5100",
    title: "Revise neural networks",
    targetDate: "2026-03-18",
    duration: "90 mins",
    completed: "No",
  },
  {
    id: 2,
    module: "COMPSCI4084",
    title: "Finish lab exercises",
    targetDate: "2026-03-20",
    duration: "120 mins",
    completed: "Yes",
  },
];

export default function StudyTasks() {
  return (
    <TableView
      title="Study Tasks"
      subtitle="Plan and track your next study sessions🔥"
      buttonLabel="Add task"
      columns={["Module", "Title", "Target Date", "Duration", "Completed"]}
      rows={studyTasks}
    />
  );
}