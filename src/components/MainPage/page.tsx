"use client";
import { useState, useEffect } from "react";
import NamesList from "../NamesList/page";
import { shuffle } from "lodash";

export default function MainPage() {
  const [names, setNames] = useState<string[]>(() => {
    const savedNames = localStorage.getItem("names");
    return savedNames ? JSON.parse(savedNames) : [];
  });
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [inputName, setInputName] = useState("");
  const [_lastIndex, setLastIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("names", JSON.stringify(names));
  }, [names]);

  const handleAddName = () => {
    if (inputName) {
      setNames((prevNames) => {
        const updatedNames = [...prevNames, inputName];
        localStorage.setItem("names", JSON.stringify(updatedNames));
        return updatedNames;
      });
      setInputName("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddName();
    }
  };

  const handleRandomize = () => {
    if (names.length > 1) {
      let newNames = shuffle(names);
      let randomIndex = newNames.findIndex(
        (name: string | null) => name !== selectedName
      );
      setSelectedName(newNames[randomIndex]);
      setLastIndex(randomIndex);
    } else if (names.length === 1) {
      setSelectedName(names[0]);
      setLastIndex(0);
    }
  };

  const handleClearNames = () => {
    localStorage.removeItem("names");
    setNames([]);
    setSelectedName(null);
  };

  const handleRemoveName = (index: number) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
    localStorage.setItem("names", JSON.stringify(newNames));
    if (names.length === 2 || selectedName === names[index]) {
      handleRandomize();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <main className="flex flex-col items-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">¿A quién le toca?</h1>
        <div className="flex flex-col md:flex-row items-start justify-between md:space-x-10 border border-blue-300  p-5 rounded-3xl">
          <div className="flex flex-col items-center w-full md:w-1/2 mt-2">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ingresá un nombre"
              className="px-4 py-2 border rounded-3xl shadow text-black"
            />
            <button
              onClick={handleAddName}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
            >
              Agregar
            </button>
          </div>
          <div className="flex flex-col items-center w-full md:w-1/2">
            <NamesList names={names} onDelete={handleRemoveName} />
            <button
              onClick={handleClearNames}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl"
            >
              Vaciar
            </button>
          </div>
        </div>
        <button
          onClick={handleRandomize}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-3xl"
        >
          Elegir
        </button>
        <p className="mt-4 text-lg font-semibold text-white h-6">
          {selectedName ? `A ${selectedName} le toca tomar mate!` : ""}
        </p>
      </main>
    </div>
  );
}
