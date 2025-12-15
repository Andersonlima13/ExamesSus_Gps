import { useState } from "react";
import { cadastrarCidadao } from "../services/servidorService";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

export default function CadastrarUsuarioModal({ onClose }) {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");

  const handleSubmit = async () => {
    if (!nome || !documento) {
      alert("Preencha todos os campos.");
      return;
    }

    const result = await cadastrarCidadao(nome, documento);
    alert(result.message);

    if (result.success) onClose();
  };

  return (
    <Modal>
      <h3>Cadastrar Cidadão</h3>

      <Input
        label="Nome completo"
        placeholder="Nome do cidadão"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <Input
        label="Documento"
        placeholder="CPF ou RG"
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="default" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Salvar
        </Button>
      </div>
    </Modal>
  );
}
