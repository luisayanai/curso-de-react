import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from "react";
import { v4 } from "uuid";
import { useEffect } from "react";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  // executa a função (1º parâmetro) sempre que algum elemento da lista (2º parâmetro) for alterado
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    async function fetchTasks() {
      // chamar API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        { method: "GET" }
      );
      // pegar os dados que ela retorna
      const data = await response.json();
      // armazenar/persistir esses dados no state
      setTasks(data);
    }
    fetchTasks();
  }, []);

  // função que atualiza o State (atualiza a interface)
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // precisa atualizar essa tarefa atual
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      // não precisa atualizar tarefa
      return task;
    });
    // atualizando o State para a nova lista de tarefas (isCompleted da tarefa específica foi atualizado)
    setTasks(newTasks);
  }

  // função que atualiza o State para deletar tarefa
  function onDeleteTaskClick(taskId) {
    // lista vai conter todas as tarefas com exceção da tarefa que precisa deletar
    const newTasks = tasks.filter((task) => task.id != taskId);

    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(), // número aleatório
      // short-hand syntax:
      title,
      description,
      isCompleted: false,
    };
    // set task com tudo que estava na lista anteriormente, mais a newTask
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
