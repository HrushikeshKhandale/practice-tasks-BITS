import React, { useEffect, useRef, useState } from "react";

function App() {
  const [inputs, setInputs] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragIndex = useRef();
  const dragOverIndex = useRef();

  useEffect(() => {
    const storedInputs = JSON.parse(localStorage.getItem("inputs"));

    if (storedInputs && storedInputs.length > 0) {
      setInputs(storedInputs);
    } else {
      // Setting up initial inputs
      setInputs(["", "", "", "", "", "", ""]);
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem("inputs");
    window.location.reload();
  };

  const handleInputChange = (index, value) => {
    const inputsClone = [...inputs];
    inputsClone[index] = value;
    setInputs(inputsClone);
    localStorage.setItem("inputs", JSON.stringify(inputsClone));
  };

  const handleDragStart = (index) => {
    setIsDragging(true);
    dragIndex.current = index;
  };

  const handleDragEnter = (index) => {
    if (isDragging) {
      dragOverIndex.current = index;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const inputsClone = [...inputs];
    const draggedInput = inputsClone[dragIndex.current];
    inputsClone.splice(dragIndex.current, 1);
    inputsClone.splice(dragOverIndex.current, 0, draggedInput);
    setInputs(inputsClone);
    localStorage.setItem("inputs", JSON.stringify(inputsClone));
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1> Drag & Drop Fields</h1>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {inputs.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              style={{
                padding: "5px",
                margin: "5px",
                backgroundColor: "#eee",
                cursor: "pointer",
                width: "200px",
              }}
            />
          ))}
        </div>
      </div>

      <button onClick={handleClear}>Clear</button>
    </>
  );
}

export default App;
