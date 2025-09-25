import Task from '../models/Task.js';

export const getAllTasks = async (request, response) => {
    const { filter = 'today' } = request.query;
    const now = new Date();
    let startDate;
    switch (filter) {
        case 'today':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case 'week':
            const firstDayOfWeek = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'all':
        default: {
            startDate = null;
        }
    }
    const query = startDate ? { createdAt: { $gte: startDate } } : {};


    try {

        const result = await Task.aggregate([
            { $match: query },
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completedCount: [{ $match: { status: "completed" } }, { $count: "count" }]
                }
            }
        ]);
        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0] ? result[0].activeCount[0].count : 0;
        const completedCount = result[0].completedCount[0] ? result[0].completedCount[0].count : 0;
        response.status(200).json({ tasks, activeCount, completedCount });
    }
    catch (error) {
        console.error("Loi khi gọi getAllTasks:", error);
        response.status(500).json({ message: "Loi he thong" });
    }

};
export const createTasks = async (request, response) => {
    try {
        const { title } = request.body;
        const task = new Task({ title });
        const newTask = await task.save();
        response.status(201).json(newTask);
    }
    catch (error) {
        console.error("Loi khi gọi createTasks:", error);
        response.status(500).json({ message: "Loi he thong" });
    }
};
export const updateTasks = async (request, response) => {
    try {
        const { title, status, completedAt } = request.body;
        const updateTasks = await Task.findByIdAndUpdate(
            request.params.id,
            { title, status, completedAt },
            { new: true }
        );
        if (!updateTasks) {
            return response.status(404).json({ message: "Khong tim thay nhiem vu" });
        }
        response.status(200).json(updateTasks);
    }
    catch (error) {
        console.error("Loi khi gọi updateTasks:", error);
        response.status(500).json({ message: "Loi he thong" });
    }
};

export const deleteTasks = async (request, response) => {
    try {
        const deleteTasks = await Task.findByIdAndDelete(request.params.id);
        if (!deleteTasks) {
            return response.status(404).json({ message: "Khong tim thay nhiem vu" });
        } response.status(200).json(deleteTasks);
    } catch (error) {
        console.error("Loi khi gọi deleteTasks:", error);
        response.status(500).json({ message: "Loi he thong" });
    }
};