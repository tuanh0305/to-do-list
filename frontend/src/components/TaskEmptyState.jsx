import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg bg-gray-100 p-4 rounded-md text-center">
      <div className="space-y-3">
        <Circle className='mx-auto size-12 text-muted-foreground' />
        <div>
            <h3 className='font-medium text-foreground'>
            {
                filter ==="active"
                ? "Không có công việc đang làm"
                : filter === "completed"
                ? "Không có công việc đã hoàn thành"
                : "Không có công việc nào"
            }
            </h3>
            <p className='text-sm text-muted-foreground'>
                {filter === "all" ? "Thêm nhiệm vụ đầu tiên vào để bắt đầu!" :
                `chuyển sang "tất cả" để thấy những nhiệm vụ ${filter === `active` ? `đã hoàn thành` : `đang làm`}`
            }
            </p>
        </div>
        </div>
        </Card>
  );
};

export default TaskEmptyState