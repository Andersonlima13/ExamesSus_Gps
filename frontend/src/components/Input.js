import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  margin-bottom: 12px;
`;
const FormLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`;
const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  width: 100%;
`;

export default function Input({label, placeholder, value, onChange, type='text', children}){
  return (
    <FormGroup>
      {label && <FormLabel>{label}</FormLabel>}
      <div>
        <FormInput placeholder={placeholder} value={value} onChange={onChange} type={type} />
        {children}
      </div>
    </FormGroup>
  )
}
