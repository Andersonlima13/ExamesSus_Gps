import { useState } from "react";
import { cadastrarCidadao } from "../services/servidorService";
import Modal from "./Modal";

export default function CadastrarUsuarioModal({ onClose }) {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");

  const handleSubmit = async () => {
    const result = await cadastrarCidadao(nome, documento);
    alert(result.message);
    if (result.success) onClose();
  };

  return (
    <Modal>
      <h3>Cadastrar Cidadão</h3>

      <input
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Documento (CPF/RG)"
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
      />

      <button onClick={handleSubmit}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </Modal>
  );
}
