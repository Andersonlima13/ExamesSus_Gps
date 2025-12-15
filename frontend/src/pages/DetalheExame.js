// src/pages/DetalheExame.jsx
import styled from "styled-components";

const Card = styled.div`
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
`;

export default function DetalheExame({ exames }) {
  if (!exames.length) {
    return <p>Nenhum exame encontrado.</p>;
  }

  return (
    <>
      {exames.map((e, index) => (
        <Card key={index}>
          <strong>{e.tipoExame}</strong><br />
          Documento: {e.documentoCidadao}<br />
          Data: {e.data} – {e.horario}
        </Card>
      ))}
    </>
  );
}
