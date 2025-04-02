// Props : si aucune valeur n'est fournie, il y aura une valeur par défaut
export default function Container({ size = 'medium', spacing = 'normal', hSpacing = 'none', children}) {

    // en écho au champ énum de Strapi, avec plusieurs clés définies, associées à des classes
    const containerClassesMapping = {
        mini: 'container-mini',
        medium: 'container-medium',
        large: 'container-large',
        full: 'container-full'
      };
    //   RAPPEL : mini, medium,large, full
    
      const verticalSpacingClassesMapping = {
        none: 'pt-none pb-none',
        xsmall: 'pt-xs pb-xs',  // 20px
        small: 'pt-sm pb-sm',  // 36px
        medium: 'pt-md pb-md',  // 72px
        large: 'pt-lg pb-lg', // 108px
        xl: 'pt-xl pb-xl',    // 144x
        xxl: 'pt-xxl pb-xxl'    // 180px
      };

      const horizontalSpacingClassesMapping = {
        none: 'ph-none',
        xsmall: 'ph-xs',  // 20px
        small: 'ph-sm',  // 36px
        medium: 'ph-md',  // 72px
        large: 'ph-lg', // 108px
        xlarge: 'ph-xl',    // 144x
        xxlarge: 'ph-xxl'    // 180px
      };
// RAPPEL $spacing-scale: (
    // xs: 20px,
    // sm: 36px,
    // md: 72px,
    // lg: 108px,
    // xl: 144px,
    // xxl: 180px
// );

    //  // fallback lors de l'accès au mapping (avec ||) pour apporter une sécurité supplémentaire : il gère le cas où la valeur passée ne correspond pas à aucune clé définie dans le mapping.
    const containerClasses = containerClassesMapping[size] || containerClassesMapping.medium;
    // Je gère différemment l'espacement vertical et plus loin l'espace horizontal
    const verticalSpacingClasses = verticalSpacingClassesMapping[spacing] || verticalSpacingClassesMapping.medium;
    const horizontalSpacingClasses = horizontalSpacingClassesMapping[hSpacing] || horizontalSpacingClassesMapping.none; // par défaut pas de padding gauche/droite
    
// Dans la déclaration de mon composant, je devrais préciser les props "size" et "spacing", sinon, les valeurs 'medium' et 'normal' seront appliquées
// Dans ma props, j'utilise le temre du mapping : small, large... -> qui va appeler la classe correpondante
    return (
        <div className={`${containerClasses} ${verticalSpacingClasses} ${horizontalSpacingClasses}`}>
            {children}
        </div>
    )
}