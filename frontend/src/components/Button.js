import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  padding: 14px 22px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  background: ${props => props.variant === 'primary' ? '#2b6df6' : props.variant === 'success' ? '#16a34a' : '#fff'};
  color: ${props => (props.variant === 'primary' || props.variant === 'success') ? '#fff' : '#222'};
  width: ${props => props.full ? '100%' : 'auto'};
`;

export default function Button({children, variant='primary', full=false, onClick, type='button'}){
  return (
    <Btn type={type} variant={variant} full={full} onClick={onClick}>{children}</Btn>
  )
}
