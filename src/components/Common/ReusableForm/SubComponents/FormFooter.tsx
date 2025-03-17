/**
 * Composant FormFooter : Affiche un texte et/ou lien en bas du formulaire
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.formattedTitle - Titre du formulaire formaté pour les classNames CSS
 * @param {Object} props.footerMessage - Texte et lien à afficher
 * @param {string} props.footerMessage.type - Type de message (default, error, success, info)
 * @param {string} props.footerMessage.text - Texte d'accompagnement
 * @param {string} props.footerMessage.linkText - Texte du lien cliquable
 * @param {string} props.footerMessage.linkTo - URL vers laquelle redirige le lien
 */

import { NavLink } from 'react-router-dom';
import { FooterMessageData } from '../../../../@types/form';

interface FormFooterProps {
  formattedTitle: string;
  footerMessage: FooterMessageData;
}

function FormFooter({ formattedTitle, footerMessage }: FormFooterProps) {
  const { type, text, linkText, linkTo } = footerMessage;
  if (type === 'none') return null;
  return (
    <div className={`${formattedTitle}-form__link-container--${type}`}>
      {text && (
        <p className={`${formattedTitle}-form__link-message--${type}`}>
          {text}
        </p>
      )}
      {linkText && linkTo && (
        <NavLink
          className={`${formattedTitle}-form__link--${type}`}
          to={`${linkTo}`}
        >
          {linkText}
        </NavLink>
      )}
    </div>
  );
}

export default FormFooter;
