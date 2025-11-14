export function decodeJwtPayload<T>(token: string): T {
  const payloadBase64 = token.split(".")[1];
  if (!payloadBase64) {
    throw new Error("Token inválido");
  }

  // Convertir base64url → base64
  const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");

  // Decodificar
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload) as T;
}
