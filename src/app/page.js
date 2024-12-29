"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import { globalContext } from "./context/GlobalContext";
import CardTask from "./component/CardTask";

export default function Home() {
  const { tasks, setTasks } = useContext(globalContext);
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState("all"); // Estado para el filtro

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedTasks = tasks.map((t, index) =>
        index === editingIndex ? task : t
      );

      const respose = await axios
        .put(process.env.NEXT_PUBLIC_API + "tasks/" + task._id, task)
        .catch((error) => {
          const mensaje =
            error?.response?.data?.message || "Error en el servidor";
          alert(mensaje);
          return;
        });
      alert(respose?.data?.message);

      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      const respose = await axios
        .post(process.env.NEXT_PUBLIC_API + "tasks", task)
        .catch((error) => {
          const mensaje =
            error?.response?.data?.message || "Error en el servidor";
          alert(mensaje);
          return;
        });
      alert(respose?.data?.message);

      getTasks();
    }
    setTask({ title: "", description: "", completed: false });
  };

  const handleEdit = async (index) => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API + "tasks/" + tasks[index]._id
    );
    setTask(response?.data);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    if (window.confirm("¿Estás seguro de eliminar la tarea?")) {
      const respose = await axios
        .delete(process.env.NEXT_PUBLIC_API + "tasks/" + tasks[index]._id)
        .catch((err) => {
          const mensaje =
            err?.response?.data?.message || "Error en el servidor";
          alert(mensaje);
          return;
        });
      alert(respose?.data?.message);
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const toggleCompletion = async (task) => {
    try {
      task.completed = task.completed ? false : true;
      const respose = await axios
        .put(process.env.NEXT_PUBLIC_API + "tasks/" + task._id, task)
        .catch((error) => {
          const mensaje =
            error?.response?.data?.message || "Error en el servidor";
          alert(mensaje);
          return;
        });

      if (respose?.data?.message) {
        alert(respose?.data?.message);
        const updatedTasks = tasks.map((t) =>
          task._id === t._id ? { ...t, completed: task.completed } : t
        );
        setTasks(updatedTasks);
      }
    } catch (error) {
      const mensaje = error?.response?.data?.message || "Error en el servidor";
      alert(mensaje);
    }
  };

  const getTasks = async () => {
    try {
      setLoading(true);
      const query = filter === "all" ? "" : `?completed=${filter}`;
      const result = await axios.get(
        process.env.NEXT_PUBLIC_API + "tasks" + query
      );
      setLoading(false);
      setTasks(result.data);
    } catch (error) {
      alert("Error al obtener las tareas");
    }
  };

  useEffect(() => {
    getTasks();
  }, [filter]); // Refetch tasks when filter changes

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Titulo de tarea"
            className="border p-2 w-full mb-2"
            required
          />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Descripcion (optional)"
            className="border p-2 w-full mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {editingIndex !== null ? "Actualizar Tarea" : "Crear Tarea"}
          </button>
        </form>

        {/* Filtro de tareas */}
        <div className="mb-4">
          <label htmlFor="filter" className="block mb-2 font-semibold">
            Filtrar tareas
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="all">Todas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>

        <div className="text-center gap-3">
          <h2 className="text-3xl font-semibold ">Tasks</h2>

          <div className="flex justify-center items-center">
            <span className="mr-2">Completada</span>
            <FaCheckCircle className="text-green-500 inline-block" />
            <span className="mx-2">Pendiente</span>
            <FaRegCircle className="text-red-500 inline-block" />
          </div>
        </div>
        <div className="text-center">
          {loading ? (
            <div className="flex flex-col justify-center items-center">
              <ImSpinner className="animate-spin text-4xl text-blue-500" />
              <p className="text-gray-500">Cargando...</p>
            </div>
          ) : tasks.length === 0 && !loading ? (
            <p className="text-gray-500">No hay tareas para mostrar</p>
          ) : null}
        </div>
      </div>

      <ul className="flex gap-4 flex-wrap md:justify-center justify-start">
        {tasks.map((t, index) => (
          <li key={t._id}>
            <CardTask
              title={t.title}
              description={t.description}
              completed={t.completed}
              completedEdit={() => {
                toggleCompletion(t);
              }}
              createdAt={t.createdAt}
              handleDelete={() => handleDelete(index)}
              handleChange={() => handleEdit(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
