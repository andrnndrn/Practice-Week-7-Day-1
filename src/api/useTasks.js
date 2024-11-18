import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Create Task
  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        // Pastikan ID adalah string
        id: String(Date.now()), // Atau gunakan UUID
        ...taskData
      });
      
      setTasks(prevTasks => [...prevTasks, {
        ...response.data,
        id: String(response.data.id) // Pastikan ID selalu string
      }]);
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  // Update Task
  // Update fungsi updateTask untuk mendukung perubahan status
const updateTask = async (id, updatedTask) => {
  setLoading(true);
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    
    // Update tasks di state
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? response.data : task
      )
    );
    
    setLoading(false);
    return response.data;
  } catch (err) {
    setError(err);
    setLoading(false);
    throw err;
  }
};

  // Delete Task
  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  // Tambahkan useEffect untuk fetch ulang saat komponen mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };
};