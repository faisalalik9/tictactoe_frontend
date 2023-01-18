import React from "react";

function LabelledInput({ label, placeholder, type, ID, setState }) {
  return (
    <div className="mb-4">
      <label for={ID} className="text-md font-semibold">
        {label}
      </label>
      <br />
      <input
        id={ID}
        onChange={(e) => {
          setState(e.target.value);
        }}
        className="w-full px-4 py-4 rounded-md bg-graybg text-graytext mt-2"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

export default LabelledInput;
