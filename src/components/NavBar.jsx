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
  const [inscriptions, setInscriptions] = useState([]);
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
        console.log("Données utilisateur:", data); // Affiche les données user
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    }

    fetchUser();
  }, []);

// Pour charger toutes les formations (v1)
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


//   Pour n'afficher QUE les formations associées au user
 // 4*) Appel de l'endpoint "inscriptions" (ou direct Strapi) quand on a user.id
 useEffect(() => {
    if (!user) return;

    async function fetchInscriptions() {
      try {
        // Ex: /api/inscriptions?userId=1
        // Ou direct => http://localhost:1337/api/inscriptions?filters[user][id][$eq]=<user.id>&populate=formation
        const queryUrl = `/api/inscriptions?userId=${user.id}`;
        const res = await fetch(queryUrl);
        if (!res.ok) {
          console.error("Erreur lors de la récupération des inscriptions");
          return;
        }
        const data = await res.json();
        console.log("Inscriptions de l'utilisateur:", data); // Affiche les inscriptions
        setInscriptions(data.data || []); // Strapi renvoie { data: [...] }
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des inscriptions");
      }
    }

    fetchInscriptions();
  }, [user]);

  
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
    <nav className="main-nav">

      {/* Lien d'accueil toujours visible */}
      <Link href="/">Accueil</Link>

      {user ? (
        // Utilisateur connecté
        <>
        <span>Bonjour, {user.username || user.email}</span>
          <Link href="/dashboard">Tableau de bord</Link>

{/* 4) Lister les formations depuis enrollments */}
{inscriptions.map((inscription) => {
            // Pour Strapi v4, c'est enrollment.attributes.formation.data.attributes
            const formation = inscription?.formation;
            if (!formation) return null;

            const formationSlug = formation.slug || "";
            return (
              <Link key={inscription.id} href={`/formations/${formationSlug}`}>
                {formation.title || formation.nomFormation}
              </Link>
            );
          })}



          {/* Lister les formations autorisées */}
          {/* {formations.map((formation) => (
            <Link
              key={formation.id}
              href={`/formations/${formation.slug}`}
            >
              {formation.nomFormation}
            </Link>
          ))} */}



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
