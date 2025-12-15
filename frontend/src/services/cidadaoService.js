import api from "../lib/api";

/**
 * Lista todos os cidadãos
 * (usado no dropdown de agendamento de exames)
 */
export async function listarCidadaos() {
  try {
    const response = await api.get("/cidadao");

    return response.data; // array de { nome, documento }
  } catch (error) {
    console.error("Erro ao listar cidadãos:", error);

    return [];
  }
}
