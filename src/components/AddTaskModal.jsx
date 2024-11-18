import React, { useState, useEffect } from "react";

const AddTaskModal = ({ 
  onClose, 
  onSave, 
  initialTask = null 
}) => {
  // state default task
  const [task, setTask] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    tag: 'Development',
    status: 'To Do'
  });

  // untuk memperbarui state ketika initialTask berubah
  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    } else {
      // Reset ke nilai default jika tidak ada initialTask
      setTask({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        tag: 'Development',
        status: 'To Do'
      });
    }
  }, [initialTask]);

    // Fungsi untuk menangani perubahan nilai input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Fungsi untuk menangani submit task
  const handleSubmit = () => {
    const completeTask = {
      ...task,
      id: task.id || Date.now().toString()
    };
  
    onSave(completeTask);
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {initialTask && initialTask.id ? 'Edit Task' : 'Add Task'}
        </h3>
        <div className="form-control">
          <label className="label">Title</label>
          <input 
            type="text" 
            name="title"
            className="input input-bordered" 
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">Description</label>
          <textarea 
            name="description"
            className="textarea textarea-bordered"
            value={task.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">Start Date</label>
          <input 
            type="date" 
            name="startDate"
            className="input input-bordered"
            value={task.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">End Date</label>
          <input 
            type="date" 
            name="endDate"
            className="input input-bordered"
            value={task.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">Tag</label>
          <select 
            name="tag"
            className="select select-bordered"
            value={task.tag}
            onChange={handleChange}
          >
            <option>Development</option>
            <option>Testing</option>
            <option>Design</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">Status</label>
          <select 
            name="status"
            className="select select-bordered"
            value={task.status}
            onChange={handleChange}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
          >
            {initialTask && initialTask.id ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;