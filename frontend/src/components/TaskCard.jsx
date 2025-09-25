
import React from 'react'
import { Button } from './ui/button';
import { Square, SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { CheckCircle, Circle } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { CalendarCheck } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import api from "../lib/axios"
import { useState } from 'react';



const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`tasks/${taskId}`);
      toast.success('Task deleted successfully');
      handleTaskChanged();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };
  const updateTask = async () => {
    if (updateTaskTitle.trim() && updateTaskTitle !== task.title) {
      try {
        setIsEditing(false);
        await api.put(`tasks/${task._id}`, {
          title: updateTaskTitle,
        });
        toast.success('Task updated successfully');
        handleTaskChanged();
      } catch (error) {
        console.error('Error updating task:', error);
        toast.error('Error updating task');
      }
    } else {
      setIsEditing(false);
      setUpdateTaskTitle(task.title || "");
    }
  };
  const toggleTaskCompletion = async () => {
    try {
      if (task.status === "active") {

        await api.put(`tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success('Task status updated successfully');
        handleTaskChanged();
      }
      else {
        await api.put(`tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success('Task status updated successfully');
        handleTaskChanged();
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Error updating task status');
    }
  };
  return (
    <Card className={cn("p-4 border-0 bg-white shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
      task.status === "completed" && "opacity-70 ")}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn("flex-shrink-0 size-8 rounded-full transtition-all duration-200",
            task.status === "completed" ? "text-success hover:bg-success/30 hover:text-success/90" : " text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskCompletion}
        >
          {task.status === "completed" ? (
            <CheckCircle className="size-5" />) : (
            <Circle className="size-5" />)}

        </Button>
        {/* tiêu đề công việc hoặc input chỉnh sửa */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder='Cần phải làm gì?'
              className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") updateTask() }}
              onBlur={() => {
                setIsEditing(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p className={cn("text-base transition-all duration-200",
              task.status === "completed" ?
                "line-through text-muted-foreground"
                : "text-foreground")}>
              {task.title}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1 ">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground">-</span>
                <CalendarCheck className="size-3 text-success" />
                <span className="text-xs text-success">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>
        {/* ngày tạo & ngày hoàn thành */}

        {/* thêm icon chỉnh sửa và xóa */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* nút chỉnh sửa */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task.title || "");
            }}

          >
            <SquarePen className="size-4" />
          </Button>
          {/* nút xóa */}
          <Button

            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>

        </div>
      </div>
    </Card>
  );
};

export default TaskCard