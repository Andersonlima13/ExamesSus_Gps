import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

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
  background: radial-gradient(ellipse at 60% 40%, #eaf7fa 60%, #f0fbef 100%);
`;

const PageContent = styled.main`
  flex: 1;
  padding: 32px 0 24px 0;
  max-width: 1100px;
  margin: 0 auto;
`;

const Card = styled.section`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  padding: 32px 32px 24px 32px;
  margin-bottom: 28px;
  position: relative;
`;

const CardMeta = styled.div`
  position: absolute;
  top: 24px;
  right: 32px;
  text-align: right;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.5;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 6px 0;
`;

const CardDesc = styled.p`
  color: #444;
  margin: 0;
  font-size: 1.08rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.18rem;
  font-weight: 700;
  margin-bottom: 18px;
`;

const Empty = styled.div`
  text-align: center;
  color: #6b7280;
  padding: 48px 0 36px 0;
`;

const EmptyIco = styled.div`
  font-size: 44px;
  margin-bottom: 12px;
  color: #b3b3b3;
`;

const HistoryList = styled.div`
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fcfcfc;
  margin-top: 10px;
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 18px 12px 18px;
  border-bottom: 1px solid #f3f4f6;
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const ExamInfo = styled.div`
  flex: 1;
`;

const ExamName = styled.div`
  font-weight: 600;
  font-size: 1rem;
`;

const ExamUnit = styled.div`
  color: #6b7280;
  font-size: 0.98rem;
`;

const ExamDate = styled.div`
  color: #6b7280;
  font-size: 0.97rem;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Status = styled.span`
  background: #fee2e2;
  color: #dc2626;
  border-radius: 16px;
  font-size: 0.93rem;
  padding: 4px 16px;
  margin-left: 16px;
  font-weight: 500;
`;

export default function ExameCidadao() {
  // Mocked user and exam data
  const user = {
    nome: 'João Silva',
    cpf: '123.456.789-01',
    cartao: '123 4567 8901 2345'
  };

  const examesAgendados = []; // Nenhum exame agendado
  const historicoExames = [
    {
      id: 1,
      nome: 'Ultrassom',
      unidade: 'UBS Vila Nova',
      data: '2025-11-26',
      status: 'Cancelado'
    }
  ];

  return (
    <PageRoot>
      <UbuntuFont />
      <NavBar />
      <PageContent>
        <Card style={{marginBottom: 32}}>
          <CardTitle>Olá, {user.nome}!</CardTitle>
          <CardDesc>Acompanhe seus exames e mantenha-se informado sobre sua saúde.</CardDesc>
          <CardMeta>
            CPF: {user.cpf}<br/>
            Cartão SUS: {user.cartao}
          </CardMeta>
        </Card>

        <Card>
          <SectionTitle>Próximos Exames</SectionTitle>
          {examesAgendados.length === 0 ? (
            <Empty>
              <EmptyIco>📅</EmptyIco>
              <div style={{fontWeight: 600, fontSize: '1.1rem'}}>Nenhum exame agendado</div>
              <div style={{marginTop: 8, fontSize: '1rem'}}>Você não possui exames agendados no momento.<br/>Procure uma unidade de saúde para agendar seus exames.</div>
            </Empty>
          ) : (
            // Render future exams here
            <div>...</div>
          )}
        </Card>

        <Card>
          <SectionTitle>Histórico de Exames</SectionTitle>
          <HistoryList>
            {historicoExames.map(exame => (
              <HistoryItem key={exame.id}>
                <ExamInfo>
                  <ExamName>{exame.nome}</ExamName>
                  <ExamUnit>{exame.unidade}</ExamUnit>
                  <ExamDate>
                    <span role="img" aria-label="calendar">📅</span>
                    {new Date(exame.data).toLocaleDateString('pt-BR')}
                  </ExamDate>
                </ExamInfo>
                {exame.status === 'Cancelado' && (
                  <Status>Cancelado</Status>
                )}
              </HistoryItem>
            ))}
          </HistoryList>
        </Card>
      </PageContent>
 
    </PageRoot>
  );
}