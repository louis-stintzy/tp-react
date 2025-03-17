/**
 * Composant FormTitle : Affiche le titre d'un formulaire
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.formattedTitle - Titre du formulaire formaté pour les classNames CSS
 * @param {string} props.title - Texte du titre affiché
 */

interface FormTitleProps {
  formattedTitle: string;
  title: string;
}

function FormTitle({ formattedTitle, title }: FormTitleProps) {
  return <h2 className={`${formattedTitle}-form__title`}>{title}</h2>;
}

export default FormTitle;
