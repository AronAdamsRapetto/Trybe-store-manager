const connection = require('./connection');

const insertSale = async (sales) => {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO StoreManager.sales () VALUE ();
  `);

  const statements = sales.map((_sale) => '(?, ?, ?)').join(', ');
  const values = sales.reduce((acc, { productId, quantity }) => {
    acc.push(insertId, productId, quantity);
    return acc;
  }, []);

  await connection.execute(`
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUE ${statements}
  `, [...values]);

  return insertId;
};

const getAllSalesOrderedByid = (order) => {
  const sales = connection.execute(`
    SELECT * FROM StoreManager.sales_products
    ORDER BY sale_id ${order}
  `);

  return sales;
};

module.exports = {
  insertSale,
  getAllSalesOrderedByid,
};