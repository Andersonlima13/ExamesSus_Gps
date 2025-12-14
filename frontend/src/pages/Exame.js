import React, { useState, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from '../components/NavBar';
import ServerContext from './ServerContext';

const UbuntuFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');
  body, * {
    font-family: 'Ubuntu', Arial, sans-serif !important;
  }
`;

const PageRoot = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const PageContent = styled.main`
  flex: 1;
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const Hero = styled.section`
  background: linear-gradient(90deg,#e8f7f6,#f0fbef);
  padding: 18px;
  border-radius: 6px;
  box-shadow: 0 2px 0 rgba(0,0,0,0.05);
  margin-bottom: 18px;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const HeroCard = styled.div`
  background: transparent;
  padding: 12px;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const HeroMeta = styled.div`
  text-align: right;
  color: #6b7280;
  margin-top: 8px;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const Actions = styled.section`
  display: flex;
  gap: 18px;
  margin: 18px 0;
  @media (max-width: 720px) {
    flex-direction: column;
  }
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const Btn = styled.button`
  padding: 14px 22px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  background: ${props => props.primary ? '#2b6df6' : props.success ? '#16a34a' : '#fff'};
  color: ${props => (props.primary || props.success) ? '#fff' : '#222'};
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const ListCard = styled.div`
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.05);
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const Empty = styled.div`
  padding: 42px;
  text-align: center;
  color: #6b7280;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const EmptyIco = styled.div`
  font-size: 36px;
  margin-bottom: 10px;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const ExameItem = styled.li`
  padding: 12px;
  border-bottom: 1px solid #edf2f7;
  &:last-child { border-bottom: 0; }
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const Muted = styled.div`
  color: #6b7280;
  font-size: 13px;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const ModalCard = styled.div`
  background: #fff;
  padding: 18px;
  border-radius: 8px;
  width: 420px;
  box-shadow: 0 18px 40px rgba(2,6,23,0.2);
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;
  font-family: 'Ubuntu', Arial, sans-serif;
`;
const Label = styled.label`
  margin-top: 8px;
  font-family: 'Ubuntu', Arial, sans-serif;
`;

export default function Exame() {
  const server = useContext(ServerContext);

  if (!server) {
    return <p>Acesso não autorizado.</p>;
  }

  return (
    <PageRoot>
      <UbuntuFont />
      <NavBar />
      <PageContent>
        <Hero>
          <HeroCard>
            <h2>Painel do Servidor</h2>
            <p>Gerencie exames e cadastre novos usuários no sistema.</p>

            <HeroMeta>
              <strong>Servidor:</strong> {server.nome}<br />
              <strong>Unidade:</strong> {server.unidade}
            </HeroMeta>
          </HeroCard>
        </Hero>

        {/* resto do código permanece igual */}
      </PageContent>
    </PageRoot>
  );
}
