// src/services/exameService.js
import api from "../lib/api";

// -----------------------
// CADASTRAR EXAME
// -----------------------
export async function cadastrarExame({
  documentoCidadao,
  servidorMatricula,
  tipoExame,
  data,
  horario
}) {
  try {
    const response = await api.post("/exames/cadastrar", {
      documentoCidadao,
      servidorMatricula,
      tipoExame,
      data,
      horario
    });

    return { success: true, data: response.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Erro ao cadastrar exame"
    };
  }
}

// -----------------------
// LISTAR EXAMES DO SERVIDOR
// -----------------------
export async function listarExamesPorServidor(servidorMatricula) {
  try {
    const response = await api.get(
      `/exames/servidor/${servidorMatricula}`
    );
    return response.data;
  } catch (err) {
    console.error("Erro ao listar exames do servidor:", err);
    return [];
  }
}



export async function listarExamesCidadao(documento) {
  try {
    const response = await api.get(`/exames/cidadao/${documento}`);
    return response.data;
  } catch (err) {
    console.error("Erro ao listar exames do cidadão:", err);
    return [];
  }
}