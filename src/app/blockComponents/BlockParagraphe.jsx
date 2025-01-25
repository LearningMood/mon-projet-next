export default BlockParagraphe = ({ paragraphe }) => {
    return (
      <div>
        {paragraphe.map((block, index) => (
          <p key={index}>{block.children.map(child => child.text).join(' ')}</p>
        ))}
      </div>
    );
  };