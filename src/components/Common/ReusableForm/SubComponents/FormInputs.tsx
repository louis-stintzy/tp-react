/**
 * Composant FormInputs :
 * - Gère l'affichage d'une liste de champs de formulaire
 * - Transmet les éventuelles erreurs de validation à chaque champ
 * - Transmet `register` de `react-hook-form` pour enregistrer les champs
 * - Transmet `watch` de `react-hook-form` pour surveiller les valeurs des champs
 * - Transmet `setValue` de `react-hook-form` pour mettre à jour les valeurs des champs
 *
 * @template T - Type générique représentant les valeurs du formulaire (ex: `RegisterCredentials`)
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.formattedTitle - Titre du formulaire formaté pour les classNames CSS
 * @param {FormField<T>[]} props.fields - Liste des champs de formulaire à afficher
 * @param {FieldErrors<T>} props.errors - Erreurs de validation des champs de formulaire
 * @param {UseFormRegister<T>} props.register - Fonction `register` de `react-hook-form`
 * @param {UseFormWatch<T>} props.watch - Fonction `watch` de `react-hook-form`
 * @param {UseFormSetValue<T>} props.setValue - Fonction `setValue` de `react-hook-form`
 * @returns {JSX.Element} - Liste de composants FormInput
 */

import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FieldDesactivation, FormField } from '../../../../@types/form';
import FormInput from './FormInput';
import { useEffect, useMemo } from 'react';

interface FormInputsProps<T extends FieldValues> {
  formattedTitle: string;
  fields: FormField<T>[];
  options?: {
    fieldsDesactivation?: FieldDesactivation<T>[];
  };
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
}

function FormInputs<T extends FieldValues>({
  formattedTitle,
  fields,
  options,
  errors,
  register,
  watch,
  setValue,
}: FormInputsProps<T>) {
  // 1/ Identification des champs à surveiller (pour désactiver éventuellement d'autres champs)
  const fieldsToWatch =
    options?.fieldsDesactivation?.map((field) => field.condition.field) ?? [];

  // 2/ Récupération des valeurs des champs à surveiller
  const watchFieldsValues: PathValue<T, Path<T>>[] = watch(
    fieldsToWatch as Path<T>[]
  );

  // 3/ Identification des champs à désactiver (par comparaison des valeurs des champs surveillés aux conditions de désactivation)
  // note : on utilise useMemo pour éviter de recalculer disableFields à chaque render (ce serait une nouvelle référence à chaque fois et le useEffect serait appelé à chaque render)
  const disableFields = useMemo<Path<T>[]>(() => {
    const fieldsToDisable: Path<T>[] = [];
    options?.fieldsDesactivation?.forEach(({ field, condition }, index) => {
      const watchedValue = watchFieldsValues[index];
      if (
        watchedValue === condition.value ||
        String(watchedValue) === condition.value
      ) {
        fieldsToDisable.push(field);
      }
    });
    return fieldsToDisable;
  }, [options?.fieldsDesactivation, watchFieldsValues]);

  useEffect(() => {
    // console.log('Champs à désactiver', disableFields);
    // On nettoie les champs stockés dans `disableFields` avec `setValue`
    disableFields.forEach((field) => {
      // note: Réinitialiser avec la valeur par défaut ou une chaîne vide ?
      // il faut retrouver dans les fields du form config le champ à nettoyer (disableFields n'est qu'un tableau de string)
      const fieldToClean = fields.find((f) => f.id === field);
      if (fieldToClean) {
        const valueToSet = fieldToClean.defaultValue ?? '';
        setValue(field, valueToSet as PathValue<T, Path<T>>); // `setValue(field` ou `setValue(fieldToClean.id` est équivalent puisque c'est "name" de setValue qui est utilisé)
      }
    });
  }, [disableFields, fields, setValue]);
  return (
    <>
      {fields.map((field) => (
        <FormInput<T>
          key={field.id}
          formattedTitle={formattedTitle}
          // On passe directement toutes les propriétés de `field` à `FormInput` (label, id, type, etc. au lieu de `label={field.label}`, `id={field.id}`, etc.)
          {...field} //
          error={
            typeof errors[field.id]?.message === 'string'
              ? (errors[field.id]?.message as string)
              : null
          }
          register={register}
          disabled={disableFields.includes(field.id as Path<T>)}
        />
      ))}
    </>
  );
}

export default FormInputs;
