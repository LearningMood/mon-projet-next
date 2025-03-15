// src/services/auth.js
const authService = {
    // Inscription d'un utilisateur
    register: async (username, email, password) => {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de l\'inscription');
        }
        
        return data.user;
      } catch (error) {
        throw error;
      }
    },
    
    // Connexion d'un utilisateur
    login: async (email, password) => {
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Identifiants invalides');
        }
        
        return data.user;
      } catch (error) {
        throw error;
      }
    },
    
    // Déconnexion
    logout: async () => {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
        });
        return true;
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        return false;
      }
    },
    
    // Vérifier l'authentification actuelle
    getCurrentUser: async () => {
      try {
        const response = await fetch('/api/auth/me');
        
        if (!response.ok) {
          return null;
        }
        
        const data = await response.json();
        return data.user;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        return null;
      }
    }
  };
  
  export default authService;