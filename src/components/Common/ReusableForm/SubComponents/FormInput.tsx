/**
 * Composant FormInput : Champ de formulaire réutilisable
 * - Affiche un champ `<input>` avec un libellé `label`
 * - Applique des classes dynamiques basées sur `formattedTitle`
 * - Affiche un message d'erreur `error` si nécessaire
 * - Utilise `register` pour enregistrer le champ dans `react-hook-form`
 * - Accepte toutes les propriétés HTML natives des `<input>` via `...inputProps`
 *
 * @template T - Type générique représentant les valeurs du formulaire (ex: `RegisterCredentials`)
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.formattedTitle - Titre du formulaire formaté pour les classNames CSS
 * @param {string} props.label - Libellé du champ de formulaire
 * @param {Path<T>} props.id - Clé de l'objet `T`, utilisée pour identifier l'input dans `react-hook-form`
 * @param {boolean} [props.required] - Indique si le champ est requis (optionnel)
 * @param {string} [props.error] - Message d'erreur à afficher (optionnel)
 * @param {UseFormRegister<T>} props.register - Fonction `register` de `react-hook-form`
 * @param {InputHTMLAttributes<HTMLInputElement>} props.inputProps - Toutes les autres propriétés HTML natives de l'input
 */

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

/**
 * Props pour le composant FormInput (utilisé par le composant `FormInputs`, sous-composant de `ReusableForm`)
 * - `T` assure que `register`, `errors` et `id` sont correctement typés en fonction du formulaire utilisé.
 * - formattedTitle : titre du formulaire formaté pour les classNames CSS
 * - label : texte du libellé affiché
 * - id : clé de l'objet `T`, utilisée pour identifier l'input dans `react-hook-form`.
 * - error : message d'erreur à afficher (optionnel).
 * - register : méthode `register` fournie par `react-hook-form` pour enregistrer les champs de formulaire.
 */

export interface FormInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  formattedTitle: string;
  label: string;
  id: Path<T>;
  options?: readonly { readonly value: string; readonly label: string }[];
  error?: string | null;
  register: UseFormRegister<T>;
}

function FormInput<T extends FieldValues>({
  formattedTitle,
  label,
  id,
  type,
  options,
  required,
  error,
  register,
  ...inputProps // '...inputProps' permet de récupérer toutes les autres props passées à FormInput et les transmet à l’<input>
}: FormInputProps<T>) {
  return (
    <div className={`${formattedTitle}-form__input-container`}>
      <label htmlFor={id} className={`${formattedTitle}-form__label`}>
        {label}
      </label>

      {type === 'select' ? (
        <select
          id={id}
          required={required}
          {...register(id, {
            // required: required,
          })}
          {...inputProps}
          className={`${formattedTitle}-form__input`}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'switch' ? (
        <input
          id={id}
          type="checkbox"
          {...register(id)}
          className={`${formattedTitle}-form__checkbox-switch`}
          {...inputProps}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          {...register(id, {
            // required: required ? 'Ce champ est requis.' : false, // Todo: Fix this
            valueAsNumber: type === 'number',
          })}
          {...inputProps}
          className={`${formattedTitle}-form__input`}
        />
      )}

      <div className={`${formattedTitle}-form__error-container`}>
        {error && <p className={`${formattedTitle}-form__error`}>{error}</p>}
      </div>
    </div>
  );
}

export default FormInput;
