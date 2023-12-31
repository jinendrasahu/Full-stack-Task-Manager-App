const { Task } = require("../models/TaskModel");

module.exports.createTask = async (req, res) => {
    if (!req.body.task || !req.body.task.toString().trim()) {
        return res.status(400).json({
            timestamp: Math.floor(Date.now() / 1000),
            success: false,
            message: "Please enter task."
        });
    }

    let data = {
        user: req.user._id,
        task: req.body.task.toString().trim()
    }
    let task = await Task.create(data);
    if (task) {
        return res.status(200).json({
            timestamp: Math.floor(Date.now() / 1000),
            success: true,
            message: "Task added successfully.",
            data: task
        });
    } else {
        return res.status(400).json({
            timestamp: Math.floor(Date.now() / 1000),
            success: false,
            message: "Failed to add task."
        });
    }
}
module.exports.getTask = async (req, res) => {
    let data = {
        user: req.user._id,
        isActive:true
    }
    let task = await Task.find(data);
    if (task) {
        return res.status(200).json({
            timestamp: Math.floor(Date.now() / 1000),
            success: true,
            message: "Task fetched successfully.",
            data: task
        });
    } else {
        return res.status(400).json({
            timestamp: Math.floor(Date.now() / 1000),
            success: false,
            message: "Failed to get task."
        });
    }
}