// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUser = (id) => {
  const idx = users["users_list"].findIndex((user) => user["id"] === id);

  if (idx !== -1) {
    const removedUser = users["users_list"].splice(idx, 1)[0];
    return removedUser;
  } else {
    return null;
  }
}

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const generateID = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";

  let idLetters = "";
  for (let i = 0; i < 3; i++) {
    idLetters += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  let idNumbers = "";
  for (let i = 0; i < 3; i++) {
    idNumbers += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return idLetters + idNumbers;
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  let result;

  if (name !== undefined && job !== undefined) {
    result = findUserByNameAndJob(name, job);
  } else if (name !== undefined) {
    result = findUserByName(name);
  } else {
    result = users["users_list"];
  }

  res.send({ users_list: result });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newID = generateID();
  const userWithID = {
    id: newID,
    name: userToAdd.name,
    job: userToAdd.job
  };
  
  addUser(userWithID);
  res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const removedUser = deleteUser(id);

  if (removedUser === null) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(removedUser)
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});