import { useState } from "react";
import { cadastrarCidadao } from "../services/servidorService";
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

/* ---------- COMPONENT ---------- */
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

      <Footer>
        <Button variant="default" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Salvar
        </Button>
      </Footer>
    </Modal>
  );
}
