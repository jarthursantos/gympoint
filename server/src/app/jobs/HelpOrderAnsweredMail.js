import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderAnsweredMail {
  get key() {
    return 'HelpOrderAnsweredMail';
  }

  async handle({ data: { help_order } }) {
    await Mail.sendMail({
      to: `${help_order.student.name} <${help_order.student.email}>`,
      subject: 'Gympoint: Sua pergunta foi respondida',
      template: 'help_order_answered',
      context: {
        student_name: help_order.student.name,
        replier_name: help_order.replier.name,
        question: help_order.question,
        answer: help_order.answer,

        created_at: format(
          parseISO(help_order.created_at),
          "dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        answer_at: format(
          parseISO(help_order.answer_at),
          "dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new HelpOrderAnsweredMail();
