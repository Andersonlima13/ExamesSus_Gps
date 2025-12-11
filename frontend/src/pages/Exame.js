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
  const [exames, setExames] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientCpf, setPatientCpf] = useState('');
  const [examDate, setExamDate] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserCpf, setNewUserCpf] = useState('');

  function handleSchedule(e) {
    e.preventDefault();
    if (!patientName || !patientCpf || !examDate) return;
    const novo = { id: Date.now(), paciente: patientName, cpf: patientCpf, data: examDate };
    setExames(prev => [novo, ...prev]);
    setPatientName('');
    setPatientCpf('');
    setExamDate('');
    setShowSchedule(false);
  }

  function handleRegister(e) {
    e.preventDefault();
    if (!newUserName || !newUserCpf) return;
    alert(`Usuário "${newUserName}" cadastrado com sucesso (CPF: ${newUserCpf}).`);
    setNewUserName('');
    setNewUserCpf('');
    setShowRegister(false);
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
              Servidor: {server?.id || '123'}<br/>
              Unidade: {server?.unidade || 'UBS Centro'}
            </HeroMeta>
          </HeroCard>
        </Hero>
        <Actions>
          <Btn primary onClick={() => setShowSchedule(true)}>📅 Agendar Exame</Btn>
          <Btn success onClick={() => setShowRegister(true)}>👥 Cadastrar Usuário</Btn>
        </Actions>
        <section>
          <ListCard>
            <h3>Exames da Unidade</h3>
            {exames.length === 0 ? (
              <Empty>
                <EmptyIco>📄</EmptyIco>
                <h4>Nenhum exame encontrado</h4>
                <p>Não há exames agendados para esta unidade no momento. Use o botão "Agendar Exame" para criar novos agendamentos.</p>
              </Empty>
            ) : (
              <ul>
                {exames.map(x => (
                  <ExameItem key={x.id}>
                    <div><strong>{x.paciente}</strong> — CPF: {x.cpf}</div>
                    <Muted>Data: {new Date(x.data).toLocaleString()}</Muted>
                  </ExameItem>
                ))}
              </ul>
            )}
          </ListCard>
        </section>
        {showSchedule && (
          <Modal>
            <ModalCard>
              <h3>Agendar Exame</h3>
              <form onSubmit={handleSchedule}>
                <Label>Nome do Paciente</Label>
                <Input value={patientName} onChange={e => setPatientName(e.target.value)} />
                <Label>CPF</Label>
                <Input value={patientCpf} onChange={e => setPatientCpf(e.target.value)} />
                <Label>Data e Hora</Label>
                <Input type="datetime-local" value={examDate} onChange={e => setExamDate(e.target.value)} />
                <ModalActions>
                  <Btn type="button" onClick={() => setShowSchedule(false)}>Cancelar</Btn>
                  <Btn type="submit" primary>Agendar</Btn>
                </ModalActions>
              </form>
            </ModalCard>
          </Modal>
        )}
        {showRegister && (
          <Modal>
            <ModalCard>
              <h3>Cadastrar Usuário</h3>
              <form onSubmit={handleRegister}>
                <Label>Nome Completo</Label>
                <Input value={newUserName} onChange={e => setNewUserName(e.target.value)} />
                <Label>CPF</Label>
                <Input value={newUserCpf} onChange={e => setNewUserCpf(e.target.value)} />
                <ModalActions>
                  <Btn type="button" onClick={() => setShowRegister(false)}>Cancelar</Btn>
                  <Btn type="submit" success>Cadastrar</Btn>
                </ModalActions>
              </form>
            </ModalCard>
          </Modal>
        )}
      </PageContent>
      {/* Footer removido aqui, pois já é renderizado globalmente */}
    </PageRoot>
  );
}
