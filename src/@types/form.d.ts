import { InputHTMLAttributes } from 'react';
import { FieldValues, Path } from 'react-hook-form';

/**
 * Interface ButtonContentData : Définition du contenu du bouton de soumission
 * - `type` est le type de contenu (text, image)
 * - `content` est le texte ou l'URL de l'image
 */

export interface ButtonContentData {
  type: 'text' | 'image';
  content: string;
}

/**
 * Interface FooterMessageData : Définition des données d'un message de pied de formulaire
 * - `type` est le type de message (default, error, success, info)
 * - `text` est le message
 * - `linkText` est le texte du lien cliquable
 * - `linkTo` est l'URL vers laquelle redirige le lien
 */

export interface FooterMessageData {
  type: 'default' | 'error' | 'success' | 'info' | 'none';
  text?: string;
  linkText?: string;
  linkTo?: string;
}

/**
 * Interface FieldDesactivation : Définition de la désactivation d'un champ de formulaire
 * - `field` est le champ à désactiver
 * - `condition` est l'objet contenant le champ et sa valeur de condition
 */

export interface FieldDesactivation<T extends FieldValues> {
  field: Path<T>;
  condition: {
    field: string;
    value: string | number | boolean;
  };
}

/**
 * Interface FormField : Définition générique d'un champ de formulaire
 * - `T` représente les valeurs du formulaire (ex: `RegisterCredentials`)
 * - FieldValues est une interface définie dans la librairie react-hook-form pour typer les valeurs des champs de formulaire (export type FieldValues = Record<string, any>;)
 * - `label` est le texte du libellé affiché.
 * - `id` est une clé de `T`, typée avec `Path<T>`
 * -`Path<T>` est utilisé pour typer l'id d'un champ de formulaire comme une clé de l'interface T (chemin "T.clé" similaire à "keyof T"))
 * - On étend `InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>` pour inclure toutes les propriétés natives des `<input>`(ex: type, placeholder, etc. pas besoin de les redéfinir ici) ou des `<select>` (ex: options)
 *
 * @template T - Type générique représentant les valeurs du formulaire (ex: `RegisterCredentials`)
 * @property {string} label - Libellé du champ de formulaire
 * @property {Path<T>} id - Clé de l'objet `T`, utilisée pour identifier l'input dans `react-hook-form`
 * @property {Object[]} [options] - Options pour un champ de type `select`
 */

export interface FormField<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  id: Path<T>;
  options?: readonly { readonly value: string; readonly label: string }[]; // `as const` est utilisé dans les constantes pour avoir le bon type (tuple) dans le schema zod et rend les tableaux readonly
}

/**
 * Interface FormConfig<T> : Définition de la structure d'un formulaire configurable.
 *
 * @template T - Type des données du formulaire (ex: `RegisterCredentials`)
 * @property {string} title - Titre du formulaire.
 * @property {FormField<T>[]} fields - Liste des champs du formulaire, chacun défini selon `FormField<T>`.
 * @property {Object} [options] - Options du formulaire.
 * @property {FieldDesactivation<T>[]} [options.fieldsDesactivation] - Liste des champs à désactiver selon certaines conditions (permet de désactiver dynamiquement des champs en fonction de conditions basées sur d'autres champs du formulaire.)
 * @property {Object} submitButton - Contient le contenu du bouton de soumission.
 * @property {ButtonContentData} submitButton.loading - Texte ou image à afficher pendant le chargement.
 * @property {ButtonContentData} submitButton.default - Texte ou image à afficher par défaut.
 * @property {FooterMessageData} [footerMessage] - Message de pied de formulaire option
 */

export interface FormConfig<T extends FieldValues> {
  title: string;
  fields: FormField<T>[];
  options?: {
    fieldsDesactivation?: FieldDesactivation<T>[];
  };
  submitButton: {
    loading: ButtonContentData;
    default: ButtonContentData;
  };
  footerMessage?: FooterMessageData;
}
