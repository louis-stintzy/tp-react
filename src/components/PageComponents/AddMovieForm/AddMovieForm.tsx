import { MovieCredentials } from '../../../@types/movie';
import ReusableForm from '../../Common/ReusableForm/ReusableForm';
import { addMovieFormConfig } from './addMovieForm.config';
import { addMovieFormSchema } from './addMovieForm.schema';

import './AddMovieForm.style.css';

function AddMovieForm() {
  // const { isLoading, login } = useAuth();
  const isLoading = false;
  const add = (data: MovieCredentials) => {
    console.log(data);
  };
  return (
    <ReusableForm<MovieCredentials>
      isLoading={isLoading}
      formConfig={addMovieFormConfig}
      formSchema={addMovieFormSchema}
      action={add}
      //   footerMessage={message ?? undefined}
    />
  );
}

export default AddMovieForm;
