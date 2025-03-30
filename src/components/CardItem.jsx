import Image from 'next/image';
export default function CardItem({ slug, titre, description, imageFeat, formationName, sections }) {
    console.log("URL de l'imageFeat:", imageFeat?.formats?.thumbnail?.url);
    console.log("URL complète:", `http://localhost:1337${imageFeat?.formats?.thumbnail?.url}`);

    return (
        <div>
            <p>URL de l'image: {imageFeat}</p>
            {imageFeat && (
                <Image
                src={imageFeat}
                alt={titre}
                width={800}  // nécessaire avec next/image
                height={600} // nécessaire avec next/image
                priority={true} // Ajoute cette propriété
                style={{ width: '100%', height: 'auto' }}
                />
            )}
            <div style={{ padding: '0.5rem' }}>
                <h2>{titre}</h2>
                <p>{description}</p>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                <span>{formationName}</span>
                </p>
            </div>
            {/* {sections.map(section => (
                <div key={section.id}>
                    <h4>{section.titreSection}</h4>
                </div>
            ))} */}
        </div>
    );
}