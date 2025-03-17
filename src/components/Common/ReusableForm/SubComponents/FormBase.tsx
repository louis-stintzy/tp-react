/**
 * Composant FormBase : Formulaire de base
 * - Utilisé pour envelopper les champs d'un formulaire
 * - Gère la soumission du formulaire
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.formattedTitle - Titre du formulaire formaté pour les classNames CSS
 * @param {React.ReactNode} props.children - Contenu du formulaire (inputs et submit button)
 * @param {Function} props.onSubmit - Fonction éxécutée lors de la soumission du formulaire
 */

interface FormProps {
  formattedTitle: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function FormBase({ formattedTitle, children, onSubmit }: FormProps) {
  return (
    <form className={`${formattedTitle}-form__form`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default FormBase;
