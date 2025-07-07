import React from 'react';

const DateInput = ({ label, name, register, rules, error, ...rest }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.3rem' }}>{label}</label>
      <input
        type="date"
        {...register(name, rules)}
        {...rest}
        style={{
          padding: '0.4rem',
          border: error ? '1px solid red' : '1px solid #ccc',
          borderRadius: '4px',
          width: '100%',
        }}
      />
      {error && <p style={{ color: 'red', fontSize: '0.8rem' }}>Ce champ est obligatoire ou invalide</p>}
    </div>
  );
};

export default DateInput;
