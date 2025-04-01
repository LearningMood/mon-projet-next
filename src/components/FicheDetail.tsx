import BtnAddComment from '@/components/ui/BtnAddComment';
import BlockTitre from '@/components/blockComponents/BlockTitre';
import BlockListe from '@/components/blockComponents/BlockListe';
import BlockImage from '@/components/blockComponents/BlockImage';
import BlockParagraphe from '@/components/blockComponents/BlockParagraphe';

export default function FicheDetail({fiche, formationSlug, chapitreSlug, sections}) {

    console.log("Les sections dans FicheDetail : ", sections);

    return (
       <>
       <h1>{fiche.titre}</h1>
      <p>Type de fiche : {fiche.typeFiche}</p>

      {sections.map((section: any) => {
        const secId = section.id; // ou section.__component si c’est géré différemment
        const secTitle = section.titreSection || 'Section sans titre';
        const blocks = section.blocks || [];

        return (
          <section key={secId}>
            <h2>{secTitle}</h2>
            {blocks.map((block: any) => {
            
            switch (block.__component) {
              case 'texte.titre':
                return <BlockTitre block={block} />
  
              
              case 'texte.liste': {
                return <BlockListe block={block} />
              };

              case 'media.image-simple':
                return <BlockImage block={block} />

              case 'texte.paragrapjhe':
                return <BlockParagraphe block={block} />

              default:
                return null;
            }
          })}

          <BtnAddComment sectionId={secId}/>
          </section>
        );
      })}
       </>
    )
}