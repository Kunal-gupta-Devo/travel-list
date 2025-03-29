import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];
export default function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map(
        (item) => (item.id === id ? { ...item, packed: !item.packed } : item)
        // on the the above line we had just learned about updating obj which although different from what we have learned in past in object chapter
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}
function Form({ onAddItems }) {
  // setp 1 of controlled elment
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // const [items, setItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);

    //for empty description we add guard clause here
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // above newItem will be use as data to render UI
    // console.log(newItem);
    onAddItems(newItem);
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
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌&times;</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list </em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;

  const percentage = Math.round((numPacked * 100) / numItems);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "you got everything! Ready to go 🛬"
          : `🎒 You have ${numItems} items on your list , and you already placed
        ${numPacked}(${percentage}%)`}
      </em>
    </footer>
  );
}
