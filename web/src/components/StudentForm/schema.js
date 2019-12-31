import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .max(255, 'O nome deve possuir no máximo 255 caracteres')
    .required('O nome é obrigatório'),
  email: Yup.string()
    .email('O email informado é inválido')
    .max(255, 'O email deve possuir no máximo 255 caracteres')
    .required('O email é obrigatório'),
  height: Yup.number('Valor informado é inválido')
    .min(1, 'A altura precisa ser maior que 0')
    .required('A altura é obrigatória')
    .typeError('A altura é obrigatória'),
  weight: Yup.number('Valor informado é inválido')
    .min(1, 'O peso precisa ser maior que 0')
    .required('O peso é obrigatório')
    .typeError('O peso é obrigatório'),
  birthdate: Yup.date('A data de nascimento é inválida').required(
    'A data de nascimento é obrigatória'
  ),
});
