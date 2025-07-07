import React from "react";

const FileUpload = ({ label, name, register, rules, error, accept, ...rest }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.3rem" }}>{label}</label>
      <input
        type="file"
        {...register(name, rules)}
        {...rest}
        accept={accept} // ex: "image/*,.pdf"
        style={{
          border: error ? "1px solid red" : "1px solid #ccc",
          padding: "0.4rem",
          width: "100%",
        }}
      />
      {error && (
        <p style={{ color: "red", fontSize: "0.8rem" }}>
          Ce champ est obligatoire ou invalide
        </p>
      )}
    </div>
  );
};

export default FileUpload;
