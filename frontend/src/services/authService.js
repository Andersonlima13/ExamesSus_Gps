import api from "../lib/api";

// -----------------------
// LOGIN CIDADÃO
// -----------------------
export async function loginCidadao(documento) {
  try {
    const response = await api.post("/cidadao/login", {
      documento
    });

    return {
      success: true,
      cidadao: response.data
    };
  } catch (err) {
    return {
      success: false,
      message: "Documento não encontrado."
    };
  }
}

// -----------------------
// LOGIN SERVIDOR
// -----------------------
export async function loginServidor(matricula) {
  try {
    const response = await api.post("/servidor/login", {
      matricula
    });

    return {
      success: true,
      servidor: response.data
    };
  } catch (err) {
    return {
      success: false,
      message: "Erro ao tentar autenticar servidor."
    };
  }
}
