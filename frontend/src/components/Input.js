import React from 'react';
import './Input.css';

export default function Input({label, placeholder, value, onChange, type='text', children}){
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div>
        <input className="form-input" placeholder={placeholder} value={value} onChange={onChange} type={type} />
        {children}
      </div>
    </div>
  )
}
