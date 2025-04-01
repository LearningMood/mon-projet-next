export default function BlokListe ({block}) {
    const { type, items } = block;
        if (type === 'puces') {
            return (
            <ul>
                {items.map((item) => (
                <li key={item.id}>{item.texte}</li>
                ))}
            </ul>
            );
        }
        if (type === 'numeros') {
            return (
            <ol>
                {items.map((item) => (
                <li key={item.id}>{item.texte}</li>
                ))}
            </ol>
            );
        }
}