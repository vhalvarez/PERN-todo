const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes

// create a todo

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;

        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );

        res.json(newTodo);
    } catch (error) {
        console.error(error.message);
    }
});

// get all todo

app.get("/todos", async (req, res) => {
    try {
        const allTodo = await pool.query("SELECT * FROM todo");
        res.json(allTodo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await pool.query("SELECT * from todo WHERE todo_id = $1", [
            id,
        ]);

        res.json(todo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        res.json("Todo was update");
    } catch (error) {
        console.error(error.message);
    }
});

// delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );

        res.json("Todo was deleted!");
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/", (req, res) => {
    res.send({
        Description: "A simple TODO app using PERN",
        Author: "Victor Alvarez",
    });
});

app.listen(5000, () => {
    console.log("Server is running on Port 5000");
});
