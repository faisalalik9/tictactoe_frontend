import React from "react";

function Button({ text, color, handleClick }) {
  return (
    <button
      onClick={handleClick}
      type="submit"
      className={`w-full py-4 font-semibold text-white text-md text-center btn-cus  ${
        color === "yellow"
          ? "bg-yellow"
          : color === "grayii"
          ? "bg-grayii"
          : "bg-blue"
      }`}
    >
      {text}
    </button>
  );
}

export default Button;
