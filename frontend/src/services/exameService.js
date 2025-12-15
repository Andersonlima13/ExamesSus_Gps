// src/services/exameService.js
import api from "../lib/api";

// -----------------------
// CADASTRAR EXAME
// -----------------------
export async function cadastrarExame({
  documentoCidadao,
  servidorId,
  tipoExame,
  data,
  horario
}) {
  try {
    const response = await api.post("/exames/cadastrar", {
      documentoCidadao,
      servidorId,
      tipoExame,
      data,
      horario
    });

    return {
      success: true,
      data: response.data
    };
  } catch (err) {
    return {
      success: false,
      message:
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.message || "Erro ao cadastrar exame."
    };
  }
}

// -----------------------
// LISTAR EXAMES DO SERVIDOR
// -----------------------
export async function listarExamesPorServidor(servidorId) {
  try {
    const response = await api.get(`/exames/servidor/${servidorId}`);
    return response.data;
  } catch {
    return [];
  }
}
