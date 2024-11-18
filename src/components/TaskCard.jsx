import React from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{task.title}</h2>
        <p>{task.description}</p>
        <div className="badge badge-outline">{task.tag}</div>
        <div className="text-sm text-gray-500 mt-2">
          {task.startDate} - {task.endDate}
        </div>
        <div className="card-actions justify-end">
        <button 
            className="btn btn-xs btn-warning" 
            onClick={() => onEdit(task)}
          >
            Edit
          </button>
          <button 
            className="btn btn-xs btn-error" 
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
