export default function BlockImage ({block}) {
    return (
        <figure>
            <img src={`http://localhost:1337${block.image.url}`} alt={block.image.legende} />
            {block.image.legende && <figcaption>{block.image.legende}</figcaption>}
        </figure>
    )
}