export default function BlockTitre ({ block }) {
  // Titre, Niveau en props
  // const Tag = Niveau === 'niveau 2' ? 'h2' : 'h3'; // Exemple de condition basée sur le niveau
  // return <Tag>{Titre}</Tag>;
  return (
    <h3 key={block.id}>{block.Titre}</h3>
  )
};
