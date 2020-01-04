import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class HelpOrderAnsweredMail {
  get key() {
    return 'HelpOrderAnsweredMail';
  }

  async handle({
    data: {
      help_order: { student, replier, question, answer, created_at, answer_at },
    },
  }) {
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Gympoint: Sua pergunta foi respondida',
      template: 'answered',
      context: {
        student_name: student.name,
        replier_name: replier.name,
        question,
        answer,

        created_at: format(parseISO(created_at), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
        answer_at: format(parseISO(answer_at), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new HelpOrderAnsweredMail();
