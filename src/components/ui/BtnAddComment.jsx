"use client";
import { useState } from "react";
import axios from "axios";

export default function BtnAddComment ({sectionId, onCommentAdded}) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState(''); // le content devient comment
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    console.log ("Quell sectionId ? : ", sectionId);
    
    try {
      // Endpoint + format attendu par Strapi v4
      const response = await axios.post('http://localhost:1337/api/comments', {
        data: {
          // le nom de mon champ
          content: comment,
          // Si "section" est une relation simple (one-to-many), il suffit de passer l'ID directement :
          section: sectionId,
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      setComment('');
      setShowCommentForm(false);
      
      // Notifier le composant parent qu'un commentaire a été ajouté
      if (onCommentAdded) {
        onCommentAdded(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

    return (
      <div>
      <button className="add-comment" onClick={() => setShowCommentForm(!showCommentForm)}>
          {showCommentForm ? '-' : '+'}
      </button>

      {showCommentForm && (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Petite note pour plus tard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmitting}
            autoFocus
          />
          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => setShowCommentForm(false)}
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || !comment.trim()}
            >
              {isSubmitting ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </form>
      )}
      </div>
    )
}