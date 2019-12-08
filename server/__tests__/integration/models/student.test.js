import '../../../src/app';

import factory from '../../factories';

describe('Student', () => {
  it('should generate alternative id when new student created', async () => {
    const student = await factory.create('Student');

    expect(student).toHaveProperty('alternative_id');
  });
});
