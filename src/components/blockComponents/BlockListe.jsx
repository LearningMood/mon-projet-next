import Container from "./Container";
export default function BlokListe ({block}) {
    const { type, items } = block;
    
    return (
        <Container size="mini" spacing="xsmall">
            {type === 'puces' && (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>{item.texte}</li>
                    ))}
                </ul>
            )}
            
            {type === 'numeros' && (
                <ol>
                    {items.map((item) => (
                        <li key={item.id}>{item.texte}</li>
                    ))}
                </ol>
            )}
        </Container>
    );
}