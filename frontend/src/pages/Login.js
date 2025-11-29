import React, {useState} from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Input from '../components/Input';
import './Login.css';
import Exame from './Exame';
import ServerContext from './ServerContext';

export default function Login(){
  const [mode, setMode] = useState('cidadao');
  const [cpf, setCpf] = useState('');
  const [serverId, setServerId] = useState('');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [serverLogged, setServerLogged] = useState(false);
  const [serverData, setServerData] = useState(null);

  function submitCidadao(e){
    e.preventDefault();
    alert('Entrando como Cidadão: '+cpf);
  }
  function submitServidor(e){
    e.preventDefault();
    // mock: aceita qualquer id/nome/unidade preenchidos
    if(serverId && name && unit){
      setServerData({ id: serverId, nome: name, unidade: unit });
      setServerLogged(true);
    } else {
      alert('Preencha todos os campos do servidor.');
    }
  }

  if(serverLogged && serverData){
    return (
      <ServerContext.Provider value={serverData}>
        <Exame />
      </ServerContext.Provider>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="login-hero">
        <div className="login-card">
          <div className="avatar">👤</div>
          <h2>Bem-vindo ao ExameSUS</h2>
          <p className="muted">Acesse suas informações de exames do SUS</p>

          <div className="tabs">
            <button className={mode==='cidadao'? 'tab active': 'tab'} onClick={()=>setMode('cidadao')}>Cidadao</button>
            <button className={mode==='servidor'? 'tab active': 'tab'} onClick={()=>setMode('servidor')}>Servidor</button>
          </div>

          {mode==='cidadao' && (
            <form onSubmit={submitCidadao}>
              <Input label="CPF ou Cartão SUS" placeholder="Digite seu CPF ou Cartão SUS" value={cpf} onChange={e=>setCpf(e.target.value)} />
              <div className="small-muted">Você pode usar qualquer um dos dois documentos para acessar</div>
              <Button type="submit" variant="primary" full> Acessar Sistema</Button>
            </form>
          )}

          {mode==='servidor' && (
            <form onSubmit={submitServidor}>
              <Input label="ID do Servidor" placeholder="Digite seu ID de servidor" value={serverId} onChange={e=>setServerId(e.target.value)} />
              <Input label="Nome Completo" placeholder="Digite seu nome completo" value={name} onChange={e=>setName(e.target.value)} />
              <div className="form-group">
                <label className="form-label">Unidade de Saúde</label>
                <select className="form-input" value={unit} onChange={e=>setUnit(e.target.value)}>
                  <option value="">Selecione sua unidade</option>
                  <option value="UBS Centro">UBS Centro</option>
                  <option value="Centro de Saúde A">Centro de Saúde A</option>
                  <option value="Unidade Básica B">Unidade Básica B</option>
                </select>
              </div>
              <Button type="submit" variant="primary" full> Acessar como Servidor</Button>
            </form>
          )}

        </div>
      </div>
      <Footer />
    </div>
  )
}
