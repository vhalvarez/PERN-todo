import axios from "axios";
import React, { useState } from "react";

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    const updateDescription = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const {data} = await axios.put(
                `http://localhost:5000/todos/${todo.todo_id}`,
                { description },
                config
            );

            console.log(data)
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <div>
                {/* Button trigger modal */}
                <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${todo.todo_id}`}
                >
                    Edit
                </button>
                {/* Modal */}
                <div
                    className="modal fade"
                    id={`exampleModal${todo.todo_id}`}
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Edit TODO
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={(e) => updateDescription(e)}
                                    data-bs-dismiss="modal"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTodo;
