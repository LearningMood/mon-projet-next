import Container from "./Container";

export default function BlockImage ({block}) {
    return (
        // Par défaut, une image simple s'affiche dans un containeer large
        <Container size={block.size || 'large'}>
        <figure>
            <img src={`http://localhost:1337${block.image.url}`} alt={block.image.legende} />
            {block.image.legende && <figcaption>{block.image.legende}</figcaption>}
        </figure>
        </Container>
    )
}