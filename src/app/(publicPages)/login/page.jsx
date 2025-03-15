// page de login publique
// Appelle le endpoint POST /api/login
"use client";
"use client"; // Nécessaire pour pouvoir utiliser les Hooks

import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      // Appel vers votre endpoint Next.js :
      // POST /api/login
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          identifier: form.email, 
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`Erreur : ${data.error || 'Identifiants invalides'}`);
      } else {
        // Connexion réussie => data.user contient peut-être l'info 
        // Le cookie token est déjà placé par /api/login
        setMessage(`Connexion réussie ! Bonjour ${data.user.username || ''}.`);

        // Optionnel : rediriger automatiquement
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue.");
    }
  }

  return (
    <div className="container">
      <h1>Page de connexion :</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email :
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
