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

const getAllSales = async () => {
  const [sales] = await connection.execute(`
    SELECT
      sa_pr.sale_id AS saleId,
      sa.date AS date,
      sa_pr.product_id AS productId,
      sa_pr.quantity AS quantity
    FROM StoreManager.sales_products AS sa_pr
    JOIN StoreManager.sales AS sa ON sa.id = sa_pr.sale_id
    ORDER BY sale_id ASC, product_id ASC;
  `);

  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(`
    SELECT
      sa.date AS date,
      sa_pr.product_id AS productId,
      sa_pr.quantity AS quantity
    FROM StoreManager.sales_products AS sa_pr
    JOIN StoreManager.sales AS sa ON sa.id = sa_pr.sale_id
    WHERE sa_pr.sale_id = ?
    ORDER BY product_id ASC;
  `, [id]);

  return sale;
};

const removeSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(`
    DELETE FROM StoreManager.sales_products WHERE sale_id = ?
  `, [id]);

  return affectedRows;
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  removeSale,
};