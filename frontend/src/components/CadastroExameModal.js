import { useEffect, useState } from "react";
import { cadastrarExame } from "../services/exameService";
import { listarCidadaos } from "../services/cidadaoService";
import Button from "./Button";
import Input from "./Input";
import styled from "styled-components";

/* ---------- STYLES ---------- */
const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 420px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  width: 100%;
`;

/* ---------- COMPONENT ---------- */
export default function CadastroExameModal({ onClose }) {
  const [cidadaos, setCidadaos] = useState([]);
  const [documentoCidadao, setDocumentoCidadao] = useState("");
  const [tipoExame, setTipoExame] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  useEffect(() => {
    async function carregar() {
      const lista = await listarCidadaos();
      setCidadaos(lista);
    }
    carregar();
  }, []);

  const handleSubmit = async () => {
    if (!documentoCidadao || !tipoExame || !data || !horario) {
      alert("Preencha todos os campos.");
      return;
    }

    const result = await cadastrarExame({
      documentoCidadao,
      tipoExame,
      data,
      horario,
    });

    alert(result.message);

    if (result.success) onClose();
  };

  return (
    <Modal>
      <h3>Agendar Exame</h3>

      <label>Paciente</label>
      <Select
        value={documentoCidadao}
        onChange={(e) => setDocumentoCidadao(e.target.value)}
      >
        <option value="">Selecione o paciente</option>
        {cidadaos.map((c) => (
          <option key={c.documento} value={c.documento}>
            {c.nome} – {c.documento}
          </option>
        ))}
      </Select>

      <Input
        label="Tipo de Exame"
        placeholder="Ex: Hemograma"
        value={tipoExame}
        onChange={(e) => setTipoExame(e.target.value)}
      />

      <Input
        label="Data"
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <Input
        label="Horário"
        type="time"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
      />

      <Footer>
        <Button variant="default" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Footer>
    </Modal>
  );
}
