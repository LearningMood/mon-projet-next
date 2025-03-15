"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Erreur de chargement");
        } else {
          setUser(data.user);
        }
      } catch (err) {
        setError("Erreur lors de la récupération des données");
      }
    }

    fetchUser();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Chargement...</p>;

  return (
    <div className="container">
      <h1>Profil</h1>
      <p>Nom d'utilisateur : {user.username}</p>
      <p>Email : {user.email}</p>
      {/* Ajoutez d'autres infos de profil selon vos besoins */}
    </div>
  );
}
