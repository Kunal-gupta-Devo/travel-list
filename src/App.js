import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}
function Form() {
  // setp 1 of controlled elment
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);

    //for empty description we add guard clause here
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // above newItem will be use as data to render UI
    console.log(newItem);

    //we have to just update state then React automatically  sync with state of form element
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {/* <form className="add-from"> */}
      <h3> What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* <option value={1}> 1</>  --->manually */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      {/* below this line we used step2 and 3 of controlled element respectivly  */}
      <input
        type="text"
        placeholder="Item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌&times;</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>🎒 You have X items on your list , and you already placed X (X%) </em>
    </footer>
  );
}
