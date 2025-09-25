import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React from 'react'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import api from '../lib/axios'
import { visibleTaskLimit } from '@/lib/data'

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeCount, setActiveCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [filter, setFilter] = useState("all");
    const [dateQuery, setDateQuery] = useState("all");
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetchTasks();
    }, [dateQuery]);
    useEffect(()=>{
        setPage(1);
    },[filter,dateQuery]);
    const fetchTasks = async () => {
        try {
            const response = await api.get(`tasks?filter=${dateQuery}`);
            setTaskBuffer(response.data.tasks);
            setActiveCount(response.data.activeCount);
            setCompletedCount(response.data.completedCount);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Error fetching tasks');
        }
    };
    const handleTaskChanged = () => {
        fetchTasks();
    };
    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };
    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
    }
    const filteredTasks = taskBuffer.filter(task => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "completed";
            case "all":
                return true;
        }
    });
    const visibleTasks = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    );
    if(visibleTasks.length===0){
        handlePrev();
    }
    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

    return (
        <div className="min-h-screen w-full bg-[#f8fafc] relative">
            {/* Soft Morning Mist Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(135deg, 
          rgba(248,250,252,1) 0%, 
          rgba(219,234,254,0.7) 30%, 
          rgba(165,180,252,0.5) 60%, 
          rgba(129,140,248,0.6) 100%
        ),
        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(199,210,254,0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(224,231,255,0.3) 0%, transparent 60%)
      `,
                }}
            />
            {<div className="container pt-8 mx-auto relative z-10">

                <div className="max-w-2xl mx-auto px-4 pt-8 space-y-6">
                    <Header />
                    <AddTask
                        handleNewTaskAdded={handleTaskChanged}
                    />
                    <StatsAndFilters
                        completedTasksCount={completedCount}
                        activeTasksCount={activeCount}
                        filter={filter}
                        setFilter={setFilter}

                    />
                    <TaskList
                        filteredTasks={visibleTasks}
                        filter={filter}
                        handleTaskChanged={handleTaskChanged}
                    />
                    <div className="flex items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        < DateTimeFilter
                            dateQuery={dateQuery}
                            setDateQuery={setDateQuery}
                        />
                    </div>
                    <Footer
                        completedTasksCount={completedCount}
                        activeTasksCount={activeCount}
                    />
                </div>
            </div>
            }
        </div>

    )
}

export default HomePage
