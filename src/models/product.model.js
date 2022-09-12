const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(`
    SELECT * FROM StoreManager.products
`);
  
  return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(`
    SELECT * FROM StoreManager.products WHERE id = ?
  `, [id]);

  return product;
};

const insertProduct = async (name) => {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO StoreManager.products (name) VALUE (?)
  `, [name]);

  return insertId;
};

const updateProduct = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(`
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
  `, [name, id]);
  
  return affectedRows;
};

const removeProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(`
    DELETE FROM StoreManager.products WHERE id = ?
  `, [id]);

  return affectedRows;
};

const searchProduct = async (query) => {
  const statment = `%${query}%`;
  const [products] = await connection.execute(`
  SELECT * FROM products WHERE name LIKE ?
  `, [statment]);

  return products;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  removeProduct,
  searchProduct,
};