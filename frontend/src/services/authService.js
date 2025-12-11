import api from "../lib/api"
// -----------------------
// LOGIN CIDADÃO
// -----------------------
export async function loginCidadao(documento) {
  try {
    const response = await api.post(`/cidadao/login`, {
       documento: documento
    });

    return { success: true, message: response.data };
  } catch (err) {
    return { success: false, message: "Erro ao tentar autenticar cidadão." };
  }
}


export async function loginServidor(login, senha) {
  try {
    const response = await api.post(`/servidor/login`, null, {
      params: { login, senha }
    });

    return { success: true, message: response.data };
  } catch (err) {
    return { success: false, message: "Erro ao tentar autenticar servidor." };
  }
}
