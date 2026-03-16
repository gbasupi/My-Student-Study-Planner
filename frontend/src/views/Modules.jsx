// Modules.jsx - Main view for managing modules, including CRUD operations and displaying in a table.
import { useEffect, useState } from "react";
import TableView from "../components/TableView";
import ModuleForm from "../forms/ModuleForm";
import {
  getModules,
  createModule,
  updateModule,
  deleteModule,
} from "../api/api";

// Main component for the Modules view
export default function Modules() {
  const [modules, setModules] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const fetchModules = async () => {
    try {
      const data = await getModules();

      // Format the data for display in the table
      const formatted = data.map((module) => ({
        id: module.id,
        module_code: module.module_code,
        title: module.title,
        semester: module.semester,
      }));

      setModules(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // Open the form for creating a new module or editing.
  const handleOpenForm = (module = null) => {
    setSelectedModule(module);
    setOpenForm(true);
  };

  // Close the form and reset selected module 
  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedModule(null);
  };

  // Handle form submission for creating or updating a module
  const handleSubmit = async (formData) => {
    try {
      if (selectedModule) {
        await updateModule(selectedModule.id, formData);
      } else {
        await createModule(formData);
      }

      fetchModules();
      handleCloseForm();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle deleting a module
  const handleDelete = async (row) => {
    await deleteModule(row.id);
    fetchModules();
  };

  return (
    <>
      <TableView
        title="Modules"
        subtitle="Create and manage your modules"
        buttonLabel="Add module"
        columns={[
          { key: "module_code", label: "Module Code" },
          { key: "title", label: "Title" },
          { key: "semester", label: "Semester" },
        ]}
        rows={modules}
        onAdd={() => handleOpenForm()}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
      />

      <ModuleForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={selectedModule}
      />
    </>
  );
}