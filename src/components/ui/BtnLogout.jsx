"use client";

import { useRouter } from "next/navigation";

export default function BtnLogout() {
  const router = useRouter();

  async function handleLogout() {
    const res = await fetch("/api/logout", {
      method: "POST"
    });

    if (res.ok) {
      // Redirection vers la page de login ou d'accueil
      router.push("/login");
    } else {
      console.error("Erreur lors de la déconnexion");
    }
  }

  return (
    <button onClick={handleLogout}>
      Déconnexion
    </button>
  );
}
