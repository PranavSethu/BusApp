// const mongoose = require("mongoose");
// const taskModel = require("../models/BusModel");
// // const { id } = require("date-fns/locale");

// const createTask = async (req, res) => {
//     const { title, description } = req.body;
//     try {
//         const task = await taskModel.create({ title, description });
//         res.status(200).json(task);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// const getTasks = async (req, res) => {
//     try {
//         const tasks = await taskModel.find({});
//         res.status(200).json(tasks);
//     } catch (error) {
//         console.error("Error occurred while getting tasks:", error);
//         res.status(400).json({ error: error.message });
//     }
// };

// const getSingleTask = async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ message: "Invalid task ID" });
//     }
//     try {
//         const singleTask = await taskModel.findById(id);
//         if (!singleTask) {
//             return res.status(404).json({ message: "Task not found" });
//         }
//         res.status(200).json(singleTask);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// const getandUpdate = async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ message: "Invalid task ID" });
//     }
//     try {
//         const updatedTask = await taskModel.findByIdAndUpdate(
//             id,
//             { ...req.body },
//             { new: true } // To return the updated document
//         );
//         if (!updatedTask) {
//             return res.status(404).json({ message: "Task not found" });
//         }
//         res.status(200).json(updatedTask);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// const getandDelete = async(req,res) =>{
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ message: "Task Not Found" });
//     }
//     try{
//         const Task = await taskModel.findByIdAndDelete(id);
//         res.status(200).json(Task);
//     }
//     catch(e){
//         res.status(400).json({error:e.message});
//     }
// }

// module.exports = { createTask, getTasks, getSingleTask, getandUpdate,getandDelete};
