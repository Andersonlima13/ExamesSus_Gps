import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";
import { loginCidadao, loginServidor } from "../services/authService";
import ServerContext from './ServerContext';

// -------------------- ESTILOS --------------------
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
  margin-bottom: 8px;
`;
const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 18px;
`;
const Tabs = styled.div`
  display: flex;
  width: 100%;
  margin: 18px 0 12px 0;
`;
const Tab = styled.button`
  flex: 1;
  background: ${p => p.active ? '#fff' : '#f3f4f6'};
  border: 1px solid #e5e7eb;
  border-bottom: ${p => p.active ? '2px solid #2b6df6' : '1px solid #e5e7eb'};
  padding: 12px;
  cursor: pointer;
`;
const FormGroup = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;
const FormLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`;
const FormInput = styled.input`
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  width: 100%;
`;

// -------------------- COMPONENTE --------------------
export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("cidadao");

  const [cpf, setCpf] = useState("");
  const [serverId, setServerId] = useState("");

  // -------- LOGIN CIDADÃO --------
  async function submitCidadao(e) {
    e.preventDefault();

    if (!cpf.trim()) {
      alert("Informe seu CPF ou Cartão SUS.");
      return;
    }

    const result = await loginCidadao(cpf);

    if (result.success && result.cidadao) {
      navigate("/home/exame", {
        state: {
          nome: result.cidadao.nome,
          documento: result.cidadao.documento
        }
      });
    } else {
      alert(result.message || "Documento não encontrado.");
    }
  }

  // -------- LOGIN SERVIDOR --------
  async function submitServidor(e) {
    e.preventDefault();

    if (!serverId.trim()) {
      alert("Informe a matrícula.");
      return;
    }

    const result = await loginServidor(serverId);

    if (result.success && result.servidor) {
      navigate("/home/agendamento", {
        state: {
          servidor: result.servidor
        }
      });
    } else {
      alert(result.message || "Matrícula não encontrada.");
    }
  }

  return (
    <div>
      <NavBar />
      <LoginHero>
        <LoginCard>
          <Avatar>👤</Avatar>
          <Title>Bem-vindo ao ExameSUS</Title>
          <Subtitle>Acesse suas informações do SUS</Subtitle>

          <Tabs>
            <Tab active={mode === "cidadao"} onClick={() => setMode("cidadao")}>
              Cidadão
            </Tab>
            <Tab active={mode === "servidor"} onClick={() => setMode("servidor")}>
              Servidor
            </Tab>
          </Tabs>

          {mode === "cidadao" && (
            <form onSubmit={submitCidadao}>
              <FormGroup>
                <FormLabel>CPF ou Cartão SUS</FormLabel>
                <FormInput value={cpf} onChange={e => setCpf(e.target.value)} />
              </FormGroup>
              <Button type="submit" full>Acessar Sistema</Button>
            </form>
          )}

          {mode === "servidor" && (
            <form onSubmit={submitServidor}>
              <FormGroup>
                <FormLabel>Matrícula do Servidor</FormLabel>
                <FormInput value={serverId} onChange={e => setServerId(e.target.value)} />
              </FormGroup>
              <Button type="submit" full>Acessar como Servidor</Button>
            </form>
          )}
        </LoginCard>
      </LoginHero>
    </div>
  );
}
