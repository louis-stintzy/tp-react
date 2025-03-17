/**
 * Composant FormContainer : Gère l'affichage d'un conteneur et wrapper de formulaire
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.formattedTitle - Titre du formulaire formaté pour les classNames CSS
 * @param {React.ReactNode} props.children - Contenu du formulaire (title, form, footer)
 */

interface FormContainerProps {
  formattedTitle: string;
  children: React.ReactNode;
}

function FormContainer({ formattedTitle, children }: FormContainerProps) {
  return (
    <div className={`${formattedTitle}-form__container`}>
      <div className={`${formattedTitle}-form__wrapper`}>{children}</div>
    </div>
  );
}

export default FormContainer;
