import BtnAddComment from '@/components/ui/BtnAddComment';
import BlockTitre from '@/components/blockComponents/BlockTitre';
import BlockParagraphe from '@/components/blockComponents/BlockParagraphe';
import BlockListe from '@/components/blockComponents/BlockListe';
import BlockCarousel from '@/components/blockComponents/BlockCarousel';
import BlockImage from '@/components/blockComponents/BlockImage';
import Container from './blockComponents/Container';

export default function FicheDetail({fiche, formationSlug, chapitreSlug, sections}) {

    // console.log("Les sections dans FicheDetail : ", sections);
    console.log(fiche);

    return (
       <>
        <header>
          <Container size="large" spacing="xsmall">
              <h1>{fiche.titre}</h1>
              <small>Type de fiche : {fiche.typeFiche}</small>
          </Container>
        </header>

      {sections.map((section: any) => {
        const secId = section.id; // ou section.__component si c’est géré différemment
        const secTitle = section.titreSection || 'Section sans titre';
        const blocks = section.blocks || [];

        return (
          <section key={secId}>
            <div className="container-titre">
              <h2>{secTitle}</h2>
            </div>
            {blocks.map((block: any, index ) => {
            
            switch (block.__component) {
              case 'texte.titre':
                return <BlockTitre key={index} block={block} />
  
              
              case 'texte.liste': {
                return <BlockListe key={index} block={block} />
              };

              case 'media.image-simple':
                return <BlockImage key={index} block={block} />

              case 'media.carousel':
                return <BlockCarousel key={index} block={block} images={block.images} />

              case 'texte.paragrapjhe':
                return <BlockParagraphe key={index} block={block} />

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