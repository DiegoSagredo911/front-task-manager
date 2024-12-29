import moment from "moment-timezone";
import { FaCheckCircle, FaEdit, FaRegCircle, FaTrash } from "react-icons/fa";

const CardTask = ({
  title,
  description,
  completed,
  completedEdit,
  createdAt,
  handleDelete,
  handleChange,
}) => {
  return (
    <div
      className={`flex justify-between items-center p-2 border rounded ${
        completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex items-center">
        <button onClick={completedEdit} className="mr-2">
          {completed ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaRegCircle className="text-red-500" />
          )}
        </button>
        <div>
          <h3 className="font-bold break-all">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <span className="text-gray-400 text-sm">
            {moment
              .unix(createdAt)
              .tz("America/Santiago")
              .format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>
      </div>
      <div className="ml-4">
        <button onClick={handleChange} className="text-blue-500 mr-2">
          <FaEdit />
        </button>
        <button onClick={handleDelete} className="text-red-500">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CardTask;
