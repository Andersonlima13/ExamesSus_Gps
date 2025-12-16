import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Sair = styled.button`
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function SairButton() {
  const navigate = useNavigate();

  return (
    <Sair onClick={() => navigate("/home")}>
      Sair
    </Sair>
  );
}
