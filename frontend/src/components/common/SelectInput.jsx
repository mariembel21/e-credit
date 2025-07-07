import React from "react";

const SelectInput = ({ label, name, register, rules, error, options, ...rest }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.3rem" }}>{label}</label>
      <select
        {...register(name, rules)}
        {...rest}
        style={{
          padding: "0.4rem",
          border: error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
        }}
      >
        <option value="">-- Choisir --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p style={{ color: "red", fontSize: "0.8rem" }}>
          Ce champ est obligatoire ou invalide
        </p>
      )}
    </div>
  );
};

export default SelectInput;
