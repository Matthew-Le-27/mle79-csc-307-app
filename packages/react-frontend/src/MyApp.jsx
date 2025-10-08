// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });

    return promise
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((character) => character.id !== id);
          setCharacters(updated);
        } else {
          console.error(response.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then((newUser) => {
        if (newUser) {
          setCharacters([...characters, newUser]); 
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
  }, [] );

  return (
    <div className="container">
      <Table 
      characterData={characters}
      removeCharacter={removeOneCharacter} 
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

