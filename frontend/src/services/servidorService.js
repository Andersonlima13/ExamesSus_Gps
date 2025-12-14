// src/services/servidorService.js
import api from "../lib/api";

/**
 * Cadastra um novo cidadão no sistema
 * (ação realizada pelo servidor logado)
 */
export async function cadastrarCidadao(nome, documento) {
  try {
    await api.post("/servidor/cadastrar-cidadao", {
      nome,
      documento,
    });

    return {
      success: true,
      message: "Cidadão cadastrado com sucesso.",
    };
  } catch (err) {
    return {
      success: false,
      message:
        err?.response?.data || "Erro ao cadastrar cidadão.",
    };
  }
}

