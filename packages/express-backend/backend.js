// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor"
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ]
// };

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  userServices.findUserById(id)
    .then((result) => {
      if (result) res.send(result);
      else res.status(404).send(`Not Found: ${id}`);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userServices
    .addUser(userToAdd)
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).send(error.message);
      } else {
        res.status(500).send(error.name);
      }
    });
});


app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  
  userServices
    .deleteUserById(id)
    .then((deletedUser) => {
      if (!deletedUser) res.status(404).send(`Not Found: ${id}`);
      else res.status(204).send(); 
    })
    .catch((error) => res.status(500).send(error.name));
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});