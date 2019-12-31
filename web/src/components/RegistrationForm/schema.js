import * as Yup from 'yup';

export default Yup.object().shape({
  student: Yup.number()
    .integer('O aluno selecionado é inválido')
    .typeError('É necessário selecionar um aluno')
    .required('É necessário selecionar um aluno'),
  plan: Yup.number()
    .integer('O plano selecionado é inválido')
    .typeError('É necessário selecionar um plano')
    .required('É necessário selecionar um plano'),
  start_date: Yup.date('A data de nascimento é inválida')
    .typeError('A data de nascimento é inválida')
    .required('A data de nascimento é obrigatória'),
});
