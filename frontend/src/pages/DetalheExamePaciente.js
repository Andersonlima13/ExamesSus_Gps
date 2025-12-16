// src/pages/DetalheExamePaciente.jsx
import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

  th, td {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
  }

  th {
    background: #f9fafb;
    font-weight: 600;
  }
`;

export default function DetalheExamePaciente({ exames }) {

  if (!exames || exames.length === 0) {
    return <p>Nenhum exame encontrado.</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Tipo de Exame</th>
          <th>Data</th>
          <th>Horário</th>
          <th>Servidor</th>
        </tr>
      </thead>
      <tbody>
        {exames.map((exame, index) => (
          <tr key={index}>
            <td>{exame.tipoExame}</td>
            <td>{exame.data}</td>
            <td>{exame.horario}</td>
            <td>{exame.servidorMatricula}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
