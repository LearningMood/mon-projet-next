// src/components/BtnBack.jsx
"use client";

import { useRouter } from 'next/navigation';

export default function BtnBack({ label, fallback = '/formations' }) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <nav className="fil-ariane">
    <button onClick={handleBack} className="btn" aria-label={label}>
      {label}
    </button>
    </nav>
  );
}
