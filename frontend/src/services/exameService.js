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
      data: response.data,
      message: "Exame cadastrado com sucesso."
    };
  } catch (err) {
    const backendMessage =
      err.response?.data?.message ||
      err.response?.data ||
      "Erro ao cadastrar exame.";

    return {
      success: false,
      message:
        typeof backendMessage === "string"
          ? backendMessage
          : "Erro ao cadastrar exame."
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
  } catch (err) {
    console.error("Erro ao listar exames do servidor:", err);
    return [];
  }
}
