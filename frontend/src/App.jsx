import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css"
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Task Manager App
        </h1>

        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
