// page d'inscription publique
"use client"; // Pour pouvoir utiliser des Hooks côté client

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      // Appel à votre route API Next /api/register
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        // On affiche l'erreur renvoyée par la route API
        setMessage(`Erreur : ${data.error || 'Inconnue'}`);
      } else {
        // Succès : l'utilisateur est créé, on a reçu { user: ... }
        setMessage(`Utilisateur créé ! Bienvenue, ${data.user.username}.`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue.");
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="container">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom d’utilisateur :
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email :
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mot de passe :
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">S’inscrire</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
