import '../../../src/app';

import factory from '../../factories';

describe('Avatar', () => {
  it('should generate alternative id when new avatar created', async () => {
    const avatar = await factory.create('Avatar');

    expect(avatar).toHaveProperty('url');
  });
});
