module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Thiago Glayner',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gal Gadot',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Johnny Depp',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Scarlett Johansson',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
