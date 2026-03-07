import { useEffect, useState } from "react";
import TableView from "../components/TableViews";
import { getModules } from "../api/api";

export default function Modules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await getModules();

        const formatted = data.map((module) => ({
          id: module.id,
          module_code: module.module_code,
          title: module.title,
          semester: module.semester,
        }));

        setModules(formatted);
      } catch {}
    };

    fetchModules();
  }, []);

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