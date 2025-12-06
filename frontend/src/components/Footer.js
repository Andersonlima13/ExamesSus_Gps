import React from 'react';
import styled from 'styled-components';

const AppFooter = styled.footer`
  background: #232b36;
  color: #fff;
  padding: 24px 0 12px 0;
  margin-top: 32px;
`;
const AppFooterInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;
const Muted = styled.div`
  color: #b0b7c3;
  font-size: 14px;
  margin-top: 4px;
`;

export default function Footer(){
  return (
    <AppFooter>
      <AppFooterInner>
        <div>Sistema Único de Saúde - SUS</div>
        <Muted>Transformação Digital na Saúde Pública</Muted>
      </AppFooterInner>
    </AppFooter>
  )
}
