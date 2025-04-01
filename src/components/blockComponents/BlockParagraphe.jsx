export default function BlockParagraphe ({ block }) {
    return (
      <div key={block.id}>
        <p key={block.id}>
          {/* On simplifie l'extraction de "paragrapheRich" */}
          {block.paragrapheRich?.[0]?.children?.[0]?.text}
        </p>
      </div>
    );
  };