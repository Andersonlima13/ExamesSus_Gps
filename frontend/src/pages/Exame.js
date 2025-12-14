import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';
import { cadastrarCidadao } from '../services/servidorService';

/* ---------------- FONT ---------------- */
const UbuntuFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');
  body, * {
    font-family: 'Ubuntu', Arial, sans-serif !important;
  }
`;

/* ---------------- STYLES (reaproveitados) ---------------- */
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
  box-shadow: 0 2px 0 rgba(0,0,0,0.05);
  margin-bottom: 18px;
`;
const HeroCard = styled.div`
  padding: 12px;
`;
const HeroMeta = styled.div`
  text-align: right;
  color: #6b7280;
  margin-top: 8px;
`;
const Actions = styled.section`
  display: flex;
  gap: 18px;
  margin: 18px 0;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;
const Btn = styled.button`
  padding: 14px 22px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  background: ${p => p.primary ? '#2b6df6' : p.success ? '#16a34a' : '#fff'};
  color: ${p => (p.primary || p.success) ? '#fff' : '#222'};
  display: flex;
  align-items: center;
  gap: 8px;
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
  box-shadow: 0 18px 40px rgba(2,6,23,0.2);
`;
const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 10px;
  width: 100%;
`;
const Label = styled.label`
  font-size: 14px;
`;

/* ---------------- COMPONENT ---------------- */
export default function Exame() {
  const location = useLocation();
  const servidor = location.state?.servidor;

  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [loading, setLoading] = useState(false);

  if (!servidor) {
    return <p>Acesso não autorizado.</p>;
  }

  async function handleCadastrarCidadao() {
    if (!nome || !documento) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    const result = await cadastrarCidadao(nome, documento);

    setLoading(false);

    if (result.success) {
      alert(result.message);
      setShowModal(false);
      setNome('');
      setDocumento('');
    } else {
      alert(result.message);
    }
  }

  return (
    <PageRoot>
      <UbuntuFont />
      <NavBar />

      <PageContent>
        {/* HERO */}
        <Hero>
          <HeroCard>
            <h2>Painel do Servidor</h2>
            <p>Gerencie exames e cadastre novos usuários no sistema.</p>

            <HeroMeta>
              <strong>Servidor:</strong> {servidor.nome}<br />
              <strong>Unidade:</strong> {servidor.unidade}
            </HeroMeta>
          </HeroCard>
        </Hero>

        {/* ACTION BUTTONS */}
        <Actions>
          <Btn primary>
            📅 Agendar Exame
          </Btn>

          <Btn success onClick={() => setShowModal(true)}>
            👤 Cadastrar Usuário
          </Btn>
        </Actions>

        {/* LISTAGEM (placeholder) */}
        <ListCard>
          <h3>Exames da Unidade</h3>
          <Empty>
            <div style={{ fontSize: 32 }}>📄</div>
            Nenhum exame encontrado
          </Empty>
        </ListCard>
      </PageContent>

      {/* MODAL CADASTRO */}
      {showModal && (
        <Modal>
          <ModalCard>
            <h3>Cadastrar Novo Cidadão</h3>

            <Label>Nome completo</Label>
            <Input
              value={nome}
              onChange={e => setNome(e.target.value)}
            />

            <Label>CPF ou Documento</Label>
            <Input
              value={documento}
              onChange={e => setDocumento(e.target.value)}
            />

            <ModalActions>
              <Btn onClick={() => setShowModal(false)}>
                Cancelar
              </Btn>
              <Btn success onClick={handleCadastrarCidadao} disabled={loading}>
                {loading ? 'Salvando...' : 'Cadastrar'}
              </Btn>
            </ModalActions>
          </ModalCard>
        </Modal>
      )}
    </PageRoot>
  );
}
