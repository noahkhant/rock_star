import { useState } from "react";

import List from "./List";
import Item from "./Item";
import Form from "./Form";

const App = () => {
  const [data, setData] = useState([
    { id: 1, content: "Hello World!", name: "Bob" },
    { id: 2, content: "React is fun.", name: "Noah" },
    { id: 3, content: "Yay, interesting.", name: "John" },
  ]);

  const [showForm, setShowForm] = useState(false);

  const remove = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const add = (content, name) => {
    const id = data[data.length - 1].id + 1;
    setData([...data, { id, content, name }]);
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h1
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        Yaycha
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            width: 32,
            height: 32,
            borderRadius: 50,
            border: "0 none",
            background: showForm ? "#dc3545" : "#0d6efd",
            color: "white",
          }}>
          {showForm ? "×" : "+"}
        </button>
      </h1>

      {showForm && <Form add={add} />}
      <List>
        {data.map((item) => {
          return <Item key={item.id} item={item} remove={remove} />;
        })}
      </List>
    </div>
  );
};

export default App;
