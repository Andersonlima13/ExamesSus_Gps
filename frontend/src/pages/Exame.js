import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';

import { cadastrarCidadao } from '../services/servidorService';
import { cadastrarExame } from '../services/exameService';
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

  /* ---- cidadão ---- */
  const [showCidadaoModal, setShowCidadaoModal] = useState(false);
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');

  /* ---- exame ---- */
  const [showExameModal, setShowExameModal] = useState(false);
  const [cidadaos, setCidadaos] = useState([]);
  const [documentoCidadao, setDocumentoCidadao] = useState('');
  const [tipoExame, setTipoExame] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  /* ---- carregar cidadãos ---- */
  useEffect(() => {
    async function carregar() {
      const lista = await listarCidadaos();
      setCidadaos(lista);
    }
    carregar();
  }, []);

  if (!servidor) return <p>Acesso não autorizado.</p>;

  async function handleCadastrarCidadao() {
    const result = await cadastrarCidadao(nome, documento);
    alert(result.message);
    setShowCidadaoModal(false);
    setNome('');
    setDocumento('');
  }

  async function handleCadastrarExame() {
    const result = await cadastrarExame({
      documentoCidadao,
      tipoExame,
      data,
      horario
    });

    alert(result.message);
    setShowExameModal(false);
    setTipoExame('');
    setData('');
    setHorario('');
  }

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

      {/* -------- MODAL EXAME -------- */}
      {showExameModal && (
        <Modal>
          <ModalCard>
            <h3>Agendar Exame</h3>

            <Label>Paciente</Label>
            <Select
              value={documentoCidadao}
              onChange={e => setDocumentoCidadao(e.target.value)}
            >
              <option value="">Selecione o paciente</option>
              {cidadaos.map(c => (
                <option key={c.documento} value={c.documento}>
                  {c.nome} – {c.documento}
                </option>
              ))}
            </Select>

            <Label>Tipo de Exame</Label>
            <Input value={tipoExame} onChange={e => setTipoExame(e.target.value)} />

            <Label>Data</Label>
            <Input type="date" value={data} onChange={e => setData(e.target.value)} />

            <Label>Horário</Label>
            <Input type="time" value={horario} onChange={e => setHorario(e.target.value)} />

            <ModalActions>
              <Btn onClick={() => setShowExameModal(false)}>Cancelar</Btn>
              <Btn primary onClick={handleCadastrarExame}>Salvar</Btn>
            </ModalActions>
          </ModalCard>
        </Modal>
      )}

      {/* -------- MODAL CIDADÃO -------- */}
      {showCidadaoModal && (
        <Modal>
          <ModalCard>
            <h3>Cadastrar Cidadão</h3>

            <Label>Nome</Label>
            <Input value={nome} onChange={e => setNome(e.target.value)} />

            <Label>Documento</Label>
            <Input value={documento} onChange={e => setDocumento(e.target.value)} />

            <ModalActions>
              <Btn onClick={() => setShowCidadaoModal(false)}>Cancelar</Btn>
              <Btn success onClick={handleCadastrarCidadao}>Cadastrar</Btn>
            </ModalActions>
          </ModalCard>
        </Modal>
      )}
    </PageRoot>
  );
}
