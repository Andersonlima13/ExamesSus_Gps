// src/components/CadastrarUsuarioModal.jsx
import { useState } from "react";
import ServidorService from "../services/servidorService";

export default function CadastrarUsuarioModal({ onClose }) {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");

  const handleSubmit = async () => {
    await ServidorService.cadastrarUsuario({ nome, documento });
    alert("Usuário cadastrado com sucesso!");
    onClose();
  };

  return (
    <div className="modal">
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
    </div>
  );
}
