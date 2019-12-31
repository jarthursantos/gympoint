import * as Yup from 'yup';

export default Yup.object().shape({
  title: Yup.string()
    .max(255, 'O título deve possuir no máximo 255 caracteres')
    .required('O título é obrigatório'),
  duration: Yup.number('Valor informado é inválido')
    .integer('A duração precisa ser um valor inteiro')
    .min(1, 'A duração precisa ser maior que 0')
    .required('A duração é obrigatória')
    .typeError('A duração é obrigatória'),
  price: Yup.number('Valor informado é inválido')
    .min(1, 'O preço mensal precisa ser maior que 0')
    .required('O preço mensal é obrigatório')
    .typeError('O preço mensal é obrigatório'),
});
