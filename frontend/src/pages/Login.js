import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import Exame from './Exame';
import ServerContext from './ServerContext';

import { loginCidadao, loginServidor } from "../services/authService";
import { redirect } from 'react-router-dom';

// -------------------- ESTILOS (igual ao seu) --------------------
const LoginHero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background: linear-gradient(120deg,#e8f7f6,#f0fbef 80%);
`;
const LoginCard = styled.div`
  background: #fff;
  padding: 32px 28px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  min-width: 340px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Avatar = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg,#16a34a,#2b6df6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #fff;
  margin-bottom: 12px;
`;
const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 8px 0;
  text-align: center;
`;
const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 18px;
  text-align: center;
`;
const Tabs = styled.div`
  display: flex;
  width: 100%;
  margin: 18px 0 12px 0;
`;
const Tab = styled.button`
  flex: 1;
  background: ${props => props.active ? '#fff' : '#f3f4f6'};
  color: ${props => props.active ? '#2b6df6' : '#222'};
  border: 1px solid #e5e7eb;
  border-bottom: ${props => props.active ? '2px solid #2b6df6' : '1px solid #e5e7eb'};
  border-radius: 8px 8px 0 0;
  padding: 12px 0;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
`;
const FormGroup = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;
const FormLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
`;
const FormInput = styled.input`
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  width: 100%;
  font-size: 1rem;
`;

const SmallMuted = styled.div`
  color: #6b7280;
  font-size: 13px;
  margin-bottom: 8px;
`;

// -------------------- COMPONENTE PRINCIPAL --------------------
export default function Login() {
  const [mode, setMode] = useState('cidadao');

  // Cidadão
  const [cpf, setCpf] = useState('');

  // Servidor
  const [serverId, setServerId] = useState('');


  const [serverLogged, setServerLogged] = useState(false);
  const [serverData, setServerData] = useState(null);

  // ---------------------- LOGIN CIDADÃO ----------------------
  async function submitCidadao(e) {
    e.preventDefault();

    if (!cpf.trim()) {
      alert("Informe seu CPF ou Cartão SUS.");
      return;
    }

    const result = await loginCidadao(cpf);

    if (result.success && result.message.includes("Acesso permitido")) {
      alert("Login de cidadão realizado com sucesso!");
      redirect('/exame');
      // redirecionamento quando você desejar
    } else {
      alert("CPF inválido ou não encontrado.");
    }
  }

  // ---------------------- LOGIN SERVIDOR ----------------------
  async function submitServidor(e) {
    e.preventDefault();



    // aqui usamos ID como login e NOME como senha temporária
    const result = await loginServidor(serverId);

    if (result.success && result.message.includes("Acesso permitido")) {
      setServerData({ id: serverId});
      setServerLogged(true);
    } else {
      alert("ID ou credenciais inválidas.");
    }
  }

  // Se o servidor logou → vai para a tela de exame
  if (serverLogged && serverData) {
    return (
      <ServerContext.Provider value={serverData}>
        <Exame />
      </ServerContext.Provider>
    );
  }

  return (
    <div>
      <NavBar />
      <LoginHero>
        <LoginCard>
          <Avatar><span role="img" aria-label="avatar">👤</span></Avatar>
          <Title>Bem-vindo ao ExameSUS</Title>
          <Subtitle>Acesse suas informações de exames do SUS</Subtitle>

          <Tabs>
            <Tab active={mode === 'cidadao'} onClick={() => setMode('cidadao')}>Cidadão</Tab>
            <Tab active={mode === 'servidor'} onClick={() => setMode('servidor')}>Servidor</Tab>
          </Tabs>

          {/* ---------- FORM CIDADÃO ---------- */}
          {mode === 'cidadao' && (
            <form onSubmit={submitCidadao} style={{ width: '100%' }}>
              <FormGroup>
                <FormLabel>CPF ou Cartão SUS</FormLabel>
                <FormInput
                  placeholder="Digite seu CPF ou Cartão SUS"
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}
                />
              </FormGroup>

              <SmallMuted>Você pode usar qualquer documento para acessar.</SmallMuted>

              <Button type="submit" variant="primary" full>
                Acessar Sistema
              </Button>
            </form>
          )}

          {/* ---------- FORM SERVIDOR ---------- */}
          {mode === 'servidor' && (
            <form onSubmit={submitServidor} style={{ width: '100%' }}>
              <FormGroup>
                <FormLabel>Matricula do Servidor</FormLabel>
                <FormInput
                  placeholder="Digite sua matrícula"
                  value={serverId}
                  onChange={e => setServerId(e.target.value)}
                />
              </FormGroup>

          


              <Button type="submit" variant="primary" full>
                Acessar como Servidor
              </Button>
            </form>
          )}
        </LoginCard>
      </LoginHero>
    </div>
  );
}
