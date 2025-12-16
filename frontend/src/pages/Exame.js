import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useLocation, Navigate } from "react-router-dom";

import CadastroExameModal from "../components/CadastroExameModal";
import CadastrarUsuarioModal from "../components/CadastrarUsuarioModal";
import DetalheExame from "./DetalheExame";
import SairButton from "../components/SairButton";

import { listarExamesPorServidor } from "../services/exameService";

/* ---------------- FONT ---------------- */
const UbuntuFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');
  body, * {
    font-family: 'Ubuntu', Arial, sans-serif !important;
  }
`;

/* ---------------- STYLES ---------------- */
const PageRoot = styled.div`
  min-height: 100vh;
  background: #f0fdfb;
`;

const Header = styled.header`
  background: #fff;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #22c55e;
`;

const PageContent = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
`;

const Hero = styled.section`
  background: #fff;
  padding: 18px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const ActionCard = styled.button`
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  color: #fff;
  text-align: left;

  background: ${p => (p.green ? "#16a34a" : "#2563eb")};
`;

const ListCard = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.05);
`;

export default function Exame() {
  const location = useLocation();
  const servidor = location.state?.servidor;

  const [showCidadaoModal, setShowCidadaoModal] = useState(false);
  const [showExameModal, setShowExameModal] = useState(false);
  const [exames, setExames] = useState([]);

  async function carregarExames() {
    if (!servidor?.matricula) return;
    const lista = await listarExamesPorServidor(servidor.matricula);
    setExames(lista);
  }

  useEffect(() => {
    carregarExames();
  }, [servidor]);

  if (!servidor) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageRoot>
      <UbuntuFont />

      <Header>
        <strong>ExameSUS</strong>
        <div>
          Servidor Público &nbsp; <SairButton />
        </div>
      </Header>

      <PageContent>
        <Hero>
          <h2>Painel do Servidor</h2>
          <p>Gerencie exames e cadastre novos usuários no sistema.</p>
          <small>
            Servidor: {servidor.nome} <br />
            Unidade: {servidor.unidade}
          </small>
        </Hero>

        <Actions>
          <ActionCard onClick={() => setShowExameModal(true)}>
            📅 <strong>Agendar Exame</strong>
            <p>Agendar para paciente</p>
          </ActionCard>

          <ActionCard green onClick={() => setShowCidadaoModal(true)}>
            👤 <strong>Cadastrar Usuário</strong>
            <p>Novo cidadão no SUS</p>
          </ActionCard>
        </Actions>

        <ListCard>
          <h3>Exames da Unidade</h3>
          <DetalheExame exames={exames} />
        </ListCard>
      </PageContent>

      {showExameModal && (
        <CadastroExameModal
          servidorMatricula={servidor.matricula}
          onClose={() => setShowExameModal(false)}
          onSuccess={() => {
            setShowExameModal(false);
            carregarExames();
          }}
        />
      )}

      {showCidadaoModal && (
        <CadastrarUsuarioModal onClose={() => setShowCidadaoModal(false)} />
      )}
    </PageRoot>
  );
}
