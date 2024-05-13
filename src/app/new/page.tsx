"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPage({ params }: any) {
  const router = useRouter();
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then(({ data }) => setCurrentTask(data));
    }
  }, []);

  const handleChange = (key: string, value: string) => {
    setCurrentTask({ ...currentTask, [key]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res: any = await fetch(
        `/api/tasks${params.id ? `/${params.id}` : ""}`,
        {
          method: `${params.id ? "PUT" : "POST"}`,
          body: JSON.stringify(currentTask),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (data.status === "success") {
        router.push("/");
        router.refresh();
        return;
      }
      throw new Error();
    } catch (error) {
      console.error("Algo salio mal");
    }
  };

  const handleDelete = async () => {
    await fetch(`/api/tasks/${params.id}`, {
      method: "DELETE",
    });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" className="font-bold text-sm">
          Título de la tarea
        </label>
        <input
          type="text"
          id="title"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Título"
          onChange={(e) => handleChange("title", e.target.value)}
          value={currentTask.title}
        />
        <label htmlFor="description" className="font-bold text-sm">
          Descripción de la tarea
        </label>
        <textarea
          rows={3}
          id="description"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Describe tu tarea"
          onChange={(e) => handleChange("description", e.target.value)}
          value={currentTask.description}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {params.id ? "Editar" : "Crear"}
        </button>
        {params.id && (
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={handleDelete}
          >
            Borrar
          </button>
        )}
      </form>
    </div>
  );
}
