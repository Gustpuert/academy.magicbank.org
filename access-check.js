/**
 * MagicBank Access Check
 * Archivo canónico frontend
 */

(async function () {
  const token = localStorage.getItem("magicbank_token");

  if (!token) {
    window.location.href = "https://magicbank.org/login";
    return;
  }

  try {
    const res = await fetch("https://magic-bank-backend-production.up.railway.app/api/access/check", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("Acceso denegado");
    }

    const data = await res.json();

    if (!data.allowed) {
      window.location.href = "https://magicbank.org/pago";
      return;
    }

    // ✅ acceso permitido → no hace nada y deja cargar la página
    console.log("Acceso autorizado");

  } catch (err) {
    console.error("Error de acceso:", err);
    window.location.href = "https://magicbank.org/login";
  }
})();
