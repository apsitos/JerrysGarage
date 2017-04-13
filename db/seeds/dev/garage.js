exports.seed = function(knex, Promise) {
  return knex('junk').del()
  .then(() => {
    return Promise.all([
      knex('junk').insert({
        name: 'books',
        reason: 'they might be useful',
        cleanliness: 'dusty',
        created_at: new Date
      }),
      knex('junk').insert({
        name: 'skis',
        reason: 'Joe left them',
        cleanliness: 'dusty',
        created_at: new Date
      }),
      knex('junk').insert({
        name: 'bike',
        reason: 'blown tube',
        cleanliness: 'sparkling',
        created_at: new Date
      })
    ]);
  });
};
