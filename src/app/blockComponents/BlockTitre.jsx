export default BlockTitre = ({ Titre, Niveau }) => {
  const Tag = Niveau === 'niveau 2' ? 'h2' : 'h3'; // Exemple de condition basée sur le niveau
  return <Tag>{Titre}</Tag>;
};
