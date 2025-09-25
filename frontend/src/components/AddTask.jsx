import React from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Plus } from 'lucide-react'
import { Input } from './ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import api from "../lib/axios"
const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      // Gọi API để thêm công việc mới
      try {
        const response = await api.post("tasks", { title: newTaskTitle });
        toast.success('Task added successfully');
        handleNewTaskAdded();
      } catch (error) {
        console.error('Error adding task:', error);
        toast.error('Error adding task');
      }
      setNewTaskTitle("");
    } else {
      toast.error('Task title cannot be empty');
    }
  };


  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg bg-gray-100 p-4 rounded-md">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 bg-gray-100 p-4 rounded-md">
        <Input
          type="text"
          placeholder="Thêm công việc mới..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded bg-white 
             focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") addTask() }}
        />
        <Button
          variant="gradient"
          size="xl"
          onClick={addTask}
          className="px-6"
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>

      </div>
    </Card>
  )
}

export default AddTask