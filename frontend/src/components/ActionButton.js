// src/components/ActionButton.jsx
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: ${(props) => props.color || "#2563eb"};
  min-width: 220px;

  h4 {
    margin: 0;
    font-size: 16px;
  }

  span {
    font-size: 13px;
    opacity: 0.9;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export default function ActionButton({ title, subtitle, color, onClick }) {
  return (
    <Button color={color} onClick={onClick}>
      <h4>{title}</h4>
      <span>{subtitle}</span>
    </Button>
  );
}
