import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
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
