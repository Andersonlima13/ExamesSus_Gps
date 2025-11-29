import React from 'react';
import './Button.css';

export default function Button({children, variant='primary', full=false, onClick, type='button'}){
  return (
    <button type={type} className={["btn", variant, full? 'full': ''].join(' ')} onClick={onClick}>{children}</button>
  )
}
