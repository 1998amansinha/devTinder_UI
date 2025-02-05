import React from "react";

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div>
      <label className="form-control w-full max-w-xs ">
        <div className="label">
          <span className="label-text font-bold">{label}</span>
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="input input-bordered w-full max-w-xs"
        />
      </label>
    </div>
  );
};

export default InputField;
