import React, { useState } from "react";
import axios from "axios";

const InputTodo = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            await axios.post(
                "http://localhost:5000/todos",
                { description },
                config
            );

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <h1 className="text-center mt-5">PERN Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </>
    );
};

export default InputTodo;
