/**
 * Composant FormSubmitButton : Bouton de soumission réutilisable
 * - Utilisé pour soumettre un formulaire
 * - Désactivé (`disabled`) pendant le chargement (`isLoading`)
 * - Affiche un texte dynamique selon l'état du formulaire (`loading` ou `default`)
 * - Applique des classes dynamiques basées sur `formattedTitle`
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.formattedTitle - Titre du formulaire formaté pour les classNames CSS
 * @param {boolean} props.isLoading - Indique si le formulaire est en cours de soumission
 * @param {Object} props.buttonContent - Contient les textes/images à afficher sur le bouton
 * @param {string} props.buttonContent.loading - Texte/image affiché(e) lorsque la soumission est en cours
 * @param {string} props.buttonContent.default - Texte/image affichée lorsque le formulaire est prêt à être soumis
 */

import { ButtonContentData } from '../../../../@types/form';

interface FormSubmitButtonProps {
  formattedTitle: string;
  isLoading: boolean;
  buttonContent: {
    loading: ButtonContentData;
    default: ButtonContentData;
  };
}

function FormSubmitButton({
  formattedTitle,
  isLoading,
  buttonContent,
}: FormSubmitButtonProps) {
  const buttonDisplay = isLoading ? (
    buttonContent.loading.type === 'image' ? (
      <img
        src={buttonContent.loading.content}
        alt="Loading..."
        className={`${formattedTitle}-form__button-icon--loading`}
      />
    ) : (
      buttonContent.loading.content
    )
  ) : buttonContent.default.type === 'image' ? (
    <img
      src={buttonContent.default.content}
      alt="Submit button"
      className={`${formattedTitle}-form__button-icon--default`}
    />
  ) : (
    buttonContent.default.content
  );

  return (
    <div className={`${formattedTitle}-form__button-container`}>
      <div className={`${formattedTitle}-form__button-wrapper`}>
        <button
          type="submit"
          className={`${formattedTitle}-form__button`}
          disabled={isLoading}
        >
          {buttonDisplay}
        </button>
      </div>
    </div>
  );
}

export default FormSubmitButton;
