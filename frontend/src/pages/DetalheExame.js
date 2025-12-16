import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 14px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Status = styled.span`
  background: #fde68a;
  color: #92400e;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
`;

const Actions = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 10px;
`;

const Btn = styled.button`
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: #fff;

  background: ${p => (p.success ? "#16a34a" : "#dc2626")};
`;

export default function DetalheExame({ exames }) {
  if (!exames.length) {
    return <p>Nenhum exame encontrado.</p>;
  }

  return (
    <>
      {exames.map((e, index) => (
        <Card key={index}>
          <Header>
            <strong>{e.tipoExame}</strong>
            <Status>Agendado</Status>
          </Header>

          <p>Paciente: {e.documentoCidadao}</p>
          <p>📅 {e.data} às {e.horario}</p>

          <Actions>
            <Btn success>✔ Realizado</Btn>
            <Btn>✖ Cancelar</Btn>
          </Actions>
        </Card>
      ))}
    </>
  );
}
