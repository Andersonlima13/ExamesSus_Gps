import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';
import { listarExamesCidadao } from "../services/exameService";
import DetalheExamePaciente from "./DetalheExamePaciente";
import SairButton from '../components/SairButton';
import { useEffect, useState } from 'react';


const Header = styled.header`
  background: #fff;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #22c55e;
`;


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
  padding: 32px;
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

export default function ExameCidadao() {

  const [exames, setExames] = useState([]);


  const location = useLocation();

  // Dados vindos do login
  const { nome, documento } = location.state || {};

    useEffect(() => {
    if (documento) {
      listarExamesCidadao(documento).then(setExames);
    }
  }, [documento]);

  if (!documento) {
    return (
      <PageRoot>
        <NavBar />
        <PageContent>
          <Card>
            <CardTitle>Erro de acesso</CardTitle>
            <CardDesc>Dados do cidadão não encontrados.</CardDesc>
          </Card>
        </PageContent>
      </PageRoot>
    );
  }

  return (
    <PageRoot>
      <UbuntuFont />

            <Header>
              <strong>ExameSUS</strong>
              <div>
                Cidadao &nbsp; <SairButton />
              </div>
            </Header>


      <PageContent>
        <Card>
          <CardTitle>Olá, {nome}!</CardTitle>
          <CardDesc>
            Acompanhe seus exames e mantenha-se informado sobre sua saúde.
          </CardDesc>

          <CardMeta>
            Documento:<br />
            {documento}
          </CardMeta>
        </Card>

        {/* Próximos Exames */}
        <Card>
  <h3>Seus Exames</h3>
  <DetalheExamePaciente exames={exames} />
</Card>

        {/* Histórico */}
        <Card>
          <h3>Histórico de Exames</h3>
          <p>Nenhum exame encontrado.</p>
        </Card>
      </PageContent>
    </PageRoot>
  );
}
