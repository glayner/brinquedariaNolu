module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'purchases',
      [
        {
          user_id: 1,
          product_id: 1,
          amount: 3,
          price: 113.7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          product_id: 5,
          amount: 2,
          price: 35.8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          product_id: 2,
          amount: 4,
          price: 115.96,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          product_id: 4,
          amount: 1,
          price: 57.49,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('purchases', null, {}),
};
