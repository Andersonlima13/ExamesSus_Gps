import api from "./api";

// -----------------------
// LOGIN CIDADÃO
// -----------------------
export async function loginCidadao(documento) {
  try {
    const response = await api.post(`/cidadao/login`, null, {
      params: { documento }
    });

    return { success: true, message: response.data };
  } catch (err) {
    return { success: false, message: "Erro ao tentar autenticar cidadão." };
  }
}
// -----------------------
// LOGIN SERVIDOR
// -----------------------
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
