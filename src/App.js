import './App.css';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useEffect, useState} from "react";
import AddTask from "./components/AddTask";
import {BrowserRouter as Router, Route} from "react-router-dom";
import About from "./components/About";
import Footer from "./components/Footer";
// import React from 'react'  --> if class component is used instead of function component

const App = () => {
    const [showAddTask,setShowAddTask] = useState(false);
    const [tasks,setTasks] = useState([
    ]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, []);

    // fetch tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:3000/tasks');
        const data = await res.json();
        return data;
    }

    // fetch tasks
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:3000/tasks/${id}`);
        const data = await res.json();
        return data;
    }

    // Delete task
    const deleteTask = async (id) => {
        const res = await fetch(`http://localhost:3000/tasks/${id}`,{
            method: 'DELETE',
        });
        res.status === 200
        ? setTasks(tasks.filter((task) => task.id === id))
            : alert('Error deleting this task. Please try again later!');
    }

    // Toggle reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updTask = {...taskToToggle,
            reminder: !taskToToggle.reminder
        }
        const res =  await fetch(`http://localhost:3000/tasks/${id}`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updTask),
        });
        const data = await res.json();
        setTasks(tasks.map((task) =>
            task.id === id ? {...task,
                reminder: data.reminder} : task));
    }

    // Add task
    const addTask = async (task) => {
        const res =  await fetch('http://localhost:3000/tasks',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        const data = await res.json();
        setTasks([...tasks,data]);
    }

    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
                <Route
                    path='/'
                    exact
                    render={(props) => (
                        <>
                            {showAddTask && <AddTask onAdd={addTask} />}
                            {tasks.length > 0 ? (
                                <Tasks tasks={ tasks }
                                       onDelete={deleteTask}
                                       onToggle={toggleReminder}
                                />
                            ) : (
                                'No Tasks To Show!'
                            )}
                        </>
                    )}
                />
                <Route
                    path='/about' component={ About }
                />
                <Footer copyright='Copyright &copy; 2021'/>
            </div>
        </Router>
  );
}

/* If a react class component is used instead of the function above:
class App extends React.component {
    render() {
        return <h1>Hello from a class component</h1>
    }
}
*/

export default App;
