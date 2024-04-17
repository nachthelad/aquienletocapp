import React from "react";
import { Icon } from "@iconify/react";

type NamesListProps = {
  names: string[];
  onDelete: (index: number) => void;
};

const NamesList: React.FC<NamesListProps> = ({ names, onDelete }) => {
  return (
    <div className="mt-2">
      <h3 className="text-lg font-semibold">Nombres Cargados:</h3>
      {names.length > 0 ? (
        <ul className="list-disc list-inside">
          {names.map((name, index) => (
            <li
              key={index}
              className="text-white flex justify-between items-center"
            >
              {name}
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                <Icon
                  icon="mingcute:delete-line"
                  width="1.3rem"
                  height="1.3rem"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300">No hay nombres cargados aún.</p>
      )}
    </div>
  );
};

export default NamesList;
