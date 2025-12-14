import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';

import CadastroExameModal from "../components/CadastroExameModal";
import CadastrarUsuarioModal from "../components/CadastrarUsuarioModal";
import { listarCidadaos } from '../services/cidadaoService';

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
const HeroCard = styled.div``;
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
  background: ${p => p.primary ? '#2b6df6' : p.success ? '#16a34a' : '#fff'};
  color: ${p => (p.primary || p.success) ? '#fff' : '#222'};
`;
const ListCard = styled.div`
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.05);
`;
const Empty = styled.div`
  padding: 42px;
  text-align: center;
  color: #6b7280;
`;
const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalCard = styled.div`
  background: #fff;
  padding: 18px;
  border-radius: 8px;
  width: 420px;
`;
const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;
const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
`;
const Select = styled.select`
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
`;
const Label = styled.label`
  font-size: 14px;
`;

/* ---------------- COMPONENT ---------------- */
export default function Exame() {
  const location = useLocation();
  const servidor = location.state?.servidor;

  const [showCidadaoModal, setShowCidadaoModal] = useState(false);
  const [showExameModal, setShowExameModal] = useState(false);

  if (!servidor) return <p>Acesso não autorizado.</p>;

  return (
    <PageRoot>
      <UbuntuFont />
      <NavBar />

      <PageContent>
        <Hero>
          <HeroCard>
            <h2>Painel do Servidor</h2>
            <HeroMeta>
              <strong>{servidor.nome}</strong> – {servidor.unidade}
            </HeroMeta>
          </HeroCard>
        </Hero>

        <Actions>
          <Btn primary onClick={() => setShowExameModal(true)}>
            📅 Agendar Exame
          </Btn>

          <Btn success onClick={() => setShowCidadaoModal(true)}>
            👤 Cadastrar Usuário
          </Btn>
        </Actions>

        <ListCard>
          <h3>Exames da Unidade</h3>
          <Empty>Nenhum exame encontrado</Empty>
        </ListCard>
      </PageContent>

      {showExameModal && (
        <CadastroExameModal onClose={() => setShowExameModal(false)} />
      )}

      {showCidadaoModal && (
        <CadastrarUsuarioModal onClose={() => setShowCidadaoModal(false)} />
      )}
    </PageRoot>
  );
}