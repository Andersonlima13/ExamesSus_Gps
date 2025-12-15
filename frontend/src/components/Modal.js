import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 420px;
`;

export default function Modal({ children }) {
  return (
    <Overlay>
      <Card>
        {children}
      </Card>
    </Overlay>
  );
}
