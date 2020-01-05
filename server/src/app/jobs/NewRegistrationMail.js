import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';
import formatPrice from '../../util/formatPrice';

class NewRegistrationMail {
  get key() {
    return 'NewRegistrationMail';
  }

  async handle({ data: { registration } }) {
    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Gympoint: Matrícula efetuada',
      template: 'new_registration',
      context: {
        student_name: registration.student.name,
        plan_title: registration.plan.title,
        start_date: format(parseISO(registration.start_date), 'dd/MM/yyyy', {
          locale: pt,
        }),
        end_date: format(parseISO(registration.end_date), 'dd/MM/yyyy', {
          locale: pt,
        }),
        price: formatPrice(registration.price),
        code: registration.student.alternative_id,
      },
    });
  }
}

export default new NewRegistrationMail();
