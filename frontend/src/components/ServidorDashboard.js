// src/pages/ServidorDashboard.jsx
import { useState } from "react";
import ActionButton from "../components/ActionButton";
import CadastrarUsuarioModal from "../components/CadastrarUsuarioModal";

export default function ServidorDashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h2>Painel do Servidor</h2>
      <p>Gerencie exames e cadastre novos usuários no sistema.</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <ActionButton
          title="Agendar Exame"
          subtitle="Agendar para paciente"
          color="#2563eb"
          onClick={() => alert("Abrir agenda")}
        />

        <ActionButton
          title="Cadastrar Usuário"
          subtitle="Novo cidadão no SUS"
          color="#16a34a"
          onClick={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <CadastrarUsuarioModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
