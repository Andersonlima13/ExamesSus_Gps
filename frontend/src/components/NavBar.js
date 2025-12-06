import React from 'react';
import styled from 'styled-components';

const AppNavbar = styled.header`
  background: #fff;
  border-bottom: 2px solid #16a34a;
  padding: 0;
`;
const AppNavbarInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 64px;
`;
const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const BrandIcon = styled.div`
  font-size: 32px;
`;
const BrandTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
`;
const BrandSub = styled.div`
  font-size: 13px;
  color: #16a34a;
`;

export default function NavBar() {
  return (
    <AppNavbar>
      <AppNavbarInner>
        <Brand>
          <BrandIcon>📄</BrandIcon>
          <div>
            <BrandTitle>ExameSUS</BrandTitle>
            <BrandSub>Sistema de Acompanhamento de Exames</BrandSub>
          </div>
        </Brand>
      </AppNavbarInner>
    </AppNavbar>
  );
}
