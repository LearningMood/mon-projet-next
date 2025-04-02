import Container from "./Container";
export default function BlockParagraphe ({ block }) {
    return (
      <Container size="mini" spacing="xs">
        <p>
          {/* On simplifie l'extraction de "paragrapheRich" */}
          {block.paragrapheRich?.[0]?.children?.[0]?.text}
        </p>
      </Container>
    );
  };