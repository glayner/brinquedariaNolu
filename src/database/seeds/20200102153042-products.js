module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'products',
      [
        {
          description: 'Retroescavadeira Case Construction 402 Usual Plastic',
          amount: 50,
          price: 37.9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Barbie - Princesas Básicas',
          amount: 43,
          price: 28.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Patinete infantil preto - brink+',
          amount: 31,
          price: 99.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Jogo Genius Para Viagem - Estrela',
          amount: 38,
          price: 57.49,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Hot Wheels- Cadillac CTS-V escala 1/64',
          amount: 41,
          price: 17.9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('products', null, {}),
};
