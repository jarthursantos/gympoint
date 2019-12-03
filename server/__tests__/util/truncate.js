import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models)
      // .sort((a, b) => {
      //   if (a.associate && !b.associate) return a;
      //   if (b.associate && !a.associate) return b;

      //   return a;
      // })
      .map(key => {
        return database.connection.models[key].destroy({
          truncate: {
            cascade: true,
            force: true,
          },
          cascade: true,
          force: true,
        });
      })
  );
}
