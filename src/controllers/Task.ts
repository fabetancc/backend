import { request, response } from "express";
import { Task } from '../models';

const guardarTask = async(req = request, res = response) => {

    const {descripcionCorta, descripcionLarga} = req.body;

    const data = {
        descripcionCorta,
        descripcionLarga,
        usuario: req.body.id
    };
    const task = new Task(data);
    await task.save();
    res.json({
        task
    });
}

const obtenerTasks = async(req = request, res = response) => {

    const userId = req.params.uid;

    const tasks = await Task.find({ user: userId }).populate('descripcionCorta');
    res.json({
        tasks
    });
}

const actualizarTask = async(req = request, res = response) =>{
    const {descripcionCorta, descripcionLarga, id} = req.body;
    const data = {
        id,
        descripcionCorta,
        descripcionLarga
    }

    const task = await Task.findByIdAndUpdate(id, data, {new: true});

    res.json(task);

}

const finalizarTask = async(req = request, res = response) =>{
    const {estado, id} = req.body;
    const data = {
        id,
        estado
    }

    const task = await Task.findByIdAndUpdate(id, data, {new: true});

    res.json(task);

}

const eliminarTask = async(req = request, res = response) => {

    const id = req.params.id;
    
    const tasks = await Task.findByIdAndDelete(id);
    res.json({
        tasks
    });
}

export {
    guardarTask,
    obtenerTasks,
    eliminarTask,
    actualizarTask,
    finalizarTask
}