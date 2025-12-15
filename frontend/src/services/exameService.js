import api from "../lib/api";

// -----------------------
// CADASTRAR EXAME
// -----------------------
export async function cadastrarExame({ documentoCidadao, tipoExame, data, horario }) {
  try {
    await api.post("/exame", {
      documentoCidadao,
      tipoExame,
      data,      // formato: yyyy-MM-dd
      horario
    });

    return {
      success: true,
      message: "Exame cadastrado com sucesso."
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data || "Erro ao cadastrar exame."
    };
  }
}



