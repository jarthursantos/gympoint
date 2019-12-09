import '../../../src/app';

import factory from '../../factories';
import generateToken from '../../util/authToken';

describe('Student', () => {
  it('should generate alternative id when new student created', async () => {
    const { id: admin_id } = await generateToken();

    const student = await factory.create('Student', {
      created_by: admin_id,
    });

    expect(student).toHaveProperty('alternative_id');
  });
});
