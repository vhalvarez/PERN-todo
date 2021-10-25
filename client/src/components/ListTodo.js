import axios from "axios";
import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    // delete todo function
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
        } catch (error) {
            console.error(error.message);
        }
    };

    const getTodos = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/todos");

            setTodos(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, [todos]);

    return (
        <>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => {
                        return (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td>
                                    <EditTodo todo={todo}/>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteTodo(todo.todo_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ListTodo;
