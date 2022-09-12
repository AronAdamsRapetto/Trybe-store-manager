const sucessSaleInsert = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 2,
    },    
  ],
};

const productSaled = {
  id: 1,
  name: "Martelo de Thor",
};

const getAllSalesReturn = [
  {
    saleId: 1,
    date: "2022-09-11T03:25:34.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-09-11T03:25:34.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-09-11T03:25:34.000Z",
    productId: 3,
    quantity: 15,
  },
];

const getSaleByIdReturn = [
  {
    date: "2022-09-11T03:25:34.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2022-09-11T03:25:34.000Z",
    productId: 2,
    quantity: 10,
  },
];

const updateSaleReturn = {
  saleId: 2,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ],
};

module.exports = {
  sucessSaleInsert,
  productSaled,
  getAllSalesReturn,
  getSaleByIdReturn,
  updateSaleReturn,
}