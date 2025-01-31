// components/Bandeau.jsx
"use client";

import React from 'react';

export default function Bandeau({
  size = '20', // Taille par défaut
  background = 'tomato', // Couleur ou URL d'image
  text = null, // Texte ou contenu à afficher
  children, // Contenu supplémentaire
  className = '', // Classes supplémentaires
}) {
  // Déterminer la classe de taille
  const sizeClass = [`bandeau--${size}`] || '';

  // Déterminer le style de fond
  const backgroundStyle = background.startsWith('url') ? { backgroundImage: background } : { backgroundColor: background };

  return (
    <div className="bandeau bandeau--20">
      {text && <div className="bandeau__overlay"></div>}
      {(text || children) && <div className="bandeau__content">{text || children}</div>}
    </div>
  );
}
