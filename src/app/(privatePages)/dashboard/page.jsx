// page du tableau de bord protégée par middleware
"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    
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
    return(
        <div className="container">
            <h1>Mon espace</h1>
            <p>Bienvenue { user ? user.username : "" }</p>
        </div>
    )
}