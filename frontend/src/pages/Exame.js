import React, { useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './Exame.css';
import ServerContext from './ServerContext';

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
    // no backend: apenas simula um cadastro
    alert(`Usuário "${newUserName}" cadastrado com sucesso (CPF: ${newUserCpf}).`);
    setNewUserName('');
    setNewUserCpf('');
    setShowRegister(false);
  }

  return (
    <div className="page-root">
      <NavBar />
      <main className="page-content">
        <section className="hero">
          <div className="hero-card">
            <h2>Painel do Servidor</h2>
            <p>Gerencie exames e cadastre novos usuários no sistema.</p>
            <div className="hero-meta">
              Servidor: {server?.id || '123'}<br/>
              Unidade: {server?.unidade || 'UBS Centro'}
            </div>
          </div>
        </section>

        <section className="actions">
          <button className="btn primary" onClick={() => setShowSchedule(true)}>📅 Agendar Exame</button>
          <button className="btn success" onClick={() => setShowRegister(true)}>👥 Cadastrar Usuário</button>
        </section>

        <section className="list">
          <div className="card list-card">
            <h3>Exames da Unidade</h3>
            {exames.length === 0 ? (
              <div className="empty">
                <div className="empty-ico">📄</div>
                <h4>Nenhum exame encontrado</h4>
                <p>Não há exames agendados para esta unidade no momento. Use o botão "Agendar Exame" para criar novos agendamentos.</p>
              </div>
            ) : (
              <ul>
                {exames.map(x => (
                  <li key={x.id} className="exame-item">
                    <div><strong>{x.paciente}</strong> — CPF: {x.cpf}</div>
                    <div className="muted">Data: {new Date(x.data).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {showSchedule && (
          <div className="modal">
            <div className="modal-card">
              <h3>Agendar Exame</h3>
              <form onSubmit={handleSchedule}>
                <label>Nome do Paciente</label>
                <input value={patientName} onChange={e => setPatientName(e.target.value)} />
                <label>CPF</label>
                <input value={patientCpf} onChange={e => setPatientCpf(e.target.value)} />
                <label>Data e Hora</label>
                <input type="datetime-local" value={examDate} onChange={e => setExamDate(e.target.value)} />
                <div className="modal-actions">
                  <button type="button" className="btn" onClick={() => setShowSchedule(false)}>Cancelar</button>
                  <button type="submit" className="btn primary">Agendar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showRegister && (
          <div className="modal">
            <div className="modal-card">
              <h3>Cadastrar Usuário</h3>
              <form onSubmit={handleRegister}>
                <label>Nome Completo</label>
                <input value={newUserName} onChange={e => setNewUserName(e.target.value)} />
                <label>CPF</label>
                <input value={newUserCpf} onChange={e => setNewUserCpf(e.target.value)} />
                <div className="modal-actions">
                  <button type="button" className="btn" onClick={() => setShowRegister(false)}>Cancelar</button>
                  <button type="submit" className="btn success">Cadastrar</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
