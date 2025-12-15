import { useEffect, useState } from "react";
import { cadastrarExame } from "../services/exameService";
import { listarCidadaos } from "../services/cidadaoService";
import Modal from "./Modal";

export default function CadastroExameModal({ onClose }) {
  const [cidadaos, setCidadaos] = useState([]);
  const [documentoCidadao, setDocumentoCidadao] = useState("");
  const [tipoExame, setTipoExame] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  useEffect(() => {
    listarCidadaos().then(setCidadaos);
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

      <select
        value={documentoCidadao}
        onChange={(e) => setDocumentoCidadao(e.target.value)}
      >
        <option value="">Selecione o paciente</option>
        {cidadaos.map(c => (
          <option key={c.documento} value={c.documento}>
            {c.nome} – {c.documento}
          </option>
        ))}
      </select>

      <input
        placeholder="Tipo de exame"
        value={tipoExame}
        onChange={(e) => setTipoExame(e.target.value)}
      />

      <input type="date" value={data} onChange={e => setData(e.target.value)} />
      <input type="time" value={horario} onChange={e => setHorario(e.target.value)} />

      <button onClick={handleSubmit}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </Modal>
  );
}
