// { INFO
// Appelle /api/me (endpoint existant) pour savoir si l’utilisateur est logué et récupérer ses informations (dont la liste de ses formations, si vous décidez de la renvoyer directement par /api/me ou par un autre endpoint, comme /api/formations).
// Affiche des liens conditionnels selon que l’utilisateur est connecté ou non :
// Non connecté : Liens “Se connecter” et “S’inscrire”
// Connecté : Bouton “Déconnexion”, lien “Tableau de bord”, et la liste des formations
// Quand l’utilisateur clique sur “Déconnexion”, on envoie une requête POST /api/logout, puis on redirige ou on rafraîchit la page.
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const [formations, setFormations] = useState([]);
  const [error, setError] = useState("");

  // Récupérer les informations de l'utilisateur via /api/me
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me"); // GET /api/me
        if (!res.ok) {
          // 401 ou autre => non connecté
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    }

    fetchUser();
  }, []);
  useEffect(() => {
    async function fetchFormations() {
      const res = await fetch("/api/formations");
      if (!res.ok) {
        console.error("Erreur lors de la récupération des formations");
        return;
      }
      const data = await res.json();
      // data = { data: [ ... ], meta: ... }
      // on récupère le tableau:
      setFormations(data.data); 
    }

    fetchFormations();
  }, []);

  // Déconnexion
  async function handleLogout() {
    try {
      const res = await fetch("/api/logout", {
        method: "POST"
      });
      if (res.ok) {
        // Redirige vers l'accueil ou la page de login
        window.location.href = "/";
      } else {
        setError("Erreur lors de la déconnexion");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau");
    }
  }

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>

      {/* Lien d'accueil toujours visible */}
      <Link href="/">Accueil</Link>

      {user ? (
        // Utilisateur connecté
        <>
          <Link href="/dashboard">Tableau de bord</Link>
          {/* Lister les formations autorisées */}
          {formations.map((formation) => (
            <Link
              key={formation.id}
              href={`/formations/${formation.slug}`}
            >
              {formation.nomFormation}
            </Link>
          ))}

          <button onClick={handleLogout}>Déconnexion</button>
          {error && <span style={{ color: "red" }}>{error}</span>}
        </>
      ) : (
        // Utilisateur non connecté
        <>
          <Link href="/login">Se connecter</Link>
          <Link href="/register">S’inscrire</Link>
        </>
      )}
    </nav>
  );
}
