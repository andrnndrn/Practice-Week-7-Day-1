import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useTasks } from "./api/useTasks";
import Navbar from "./components/Navbar";
import KanbanColumn from "./components/KanbanColumn";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  const { tasks, createTask, updateTask, deleteTask, loading, error } =
    useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fungsi untuk handle drag and drop
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Cari task yang di-drag
    const draggedTask = tasks.find((task) => task.id === draggableId);

    if (draggedTask) {
      const updatedTask = {
        ...draggedTask,
        status: destination.droppableId,
      };

      try {
        await updateTask(draggableId, updatedTask);
      } catch (err) {
        console.error("Failed to update task", err);
      }
    }
  };

  // Fungsi untuk membuka modal
  const openModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Fungsi untuk menyimpan task baru atau memperbarui task yang ada
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask && editingTask.id) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      closeModal();
    } catch (err) {
      console.error("Failed to save task", err);
    }
  };
  // Fungsi untuk menghapus task
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Navbar onAddTaskClick={() => openModal()} />

        {isModalOpen && (
          <AddTaskModal
            onClose={closeModal}
            onSave={handleSaveTask}
            initialTask={editingTask}
          />
        )}

        <div className="container mx-auto p-4">
          <div className="flex space-x-4">
            <KanbanColumn
              title="To Do"
              droppableId="To Do"
              tasks={tasks.filter((task) => task.status === "To Do")}
              onEditTask={openModal}
              onDeleteTask={handleDeleteTask}
            />
            <KanbanColumn
              title="In Progress"
              droppableId="In Progress"
              tasks={tasks.filter((task) => task.status === "In Progress")}
              onEditTask={openModal}
              onDeleteTask={handleDeleteTask}
            />
            <KanbanColumn
              title="Done"
              droppableId="Done"
              tasks={tasks.filter((task) => task.status === "Done")}
              onEditTask={openModal}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
