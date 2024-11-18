import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const KanbanColumn = ({ 
  title, 
  droppableId, 
  tasks, 
  onEditTask, 
  onDeleteTask 
}) => {
  return (
    <div className="w-1/3 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {tasks.map((task, index) => {
              const taskId = String(task.id);
              
              return (
                <Draggable 
                  key={taskId} 
                  draggableId={taskId} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{task.title}</h3>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => onEditTask(task)}
                            className="btn btn-xs btn-outline"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => onDeleteTask(task.id)}
                            className="btn btn-xs btn-error"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {task.description}
                      </p>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {task.startDate}
                        </span>
                        <span className="text-xs text-gray-500">
                          {task.tag}
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;