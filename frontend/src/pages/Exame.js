// src/pages/Exame.jsx
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useLocation, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

import CadastroExameModal from "../components/CadastroExameModal";
import CadastrarUsuarioModal from "../components/CadastrarUsuarioModal";
import DetalheExame from "./DetalheExame";

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
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.main`
  flex: 1;
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Hero = styled.section`
  background: linear-gradient(90deg,#e8f7f6,#f0fbef);
  padding: 18px;
  border-radius: 6px;
  margin-bottom: 18px;
`;

const HeroMeta = styled.div`
  text-align: right;
  color: #6b7280;
`;

const Actions = styled.section`
  display: flex;
  gap: 18px;
  margin: 18px 0;
`;

const Btn = styled.button`
  padding: 14px 22px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: ${p =>
    p.primary ? '#2b6df6' :
    p.success ? '#16a34a' :
    '#fff'};
  color: ${p => (p.primary || p.success) ? '#fff' : '#222'};
`;

const ListCard = styled.div`
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.05);
`;

/* ---------------- COMPONENT ---------------- */
export default function Exame() {
  const location = useLocation();
  const servidor = location.state?.servidor;

  const [showCidadaoModal, setShowCidadaoModal] = useState(false);
  const [showExameModal, setShowExameModal] = useState(false);
  const [exames, setExames] = useState([]);

  // 🔄 Carrega exames do servidor
  async function carregarExames() {
    if (!servidor) return;
    const lista = await listarExamesPorServidor(servidor.id);
    setExames(lista);
  }

  useEffect(() => {
    carregarExames();
  }, [servidor]);

  // 🔐 Proteção de rota (AGORA NO JSX)
  if (!servidor) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageRoot>
      <UbuntuFont />
      <NavBar />

      <PageContent>
        <Hero>
          <h2>Painel do Servidor</h2>
          <HeroMeta>
            <strong>{servidor.nome}</strong> – {servidor.unidade}
          </HeroMeta>
        </Hero>

        <Actions>
          <Btn primary onClick={() => setShowExameModal(true)}>
            📅 Agendar Exame
          </Btn>

          <Btn success onClick={() => setShowCidadaoModal(true)}>
            👤 Cadastrar Cidadão
          </Btn>
        </Actions>

        <ListCard>
          <h3>Exames cadastrados</h3>
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
