const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
})

const getThree = (request, response) => {
  pool.query('select * from table1 limit 3', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDataById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE "Order ID" = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createNEW = (request, response) => {
  const {id, name, email } = request.body

  pool.query('insert into table1 ("Order ID","Region","Country") values($1, $2, $3);', [id, name, email], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateRC = (request, response) => {
  const id = parseInt(request.params.id)
  const { Region, Country } = request.body

  pool.query(
    'UPDATE users SET "Region" = $1, "Country" = $2 WHERE "Order ID" = $3 RETURNING *',
    [Region, Country, id],
    (error, results) => {
      if (error) {
        throw error
      } 
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`User not found`);
      } else {
  	 	  response.status(200).send(`User modified with ID: ${results.rows[0].id}`)         	
      }
      
    }
  )
}
const deleteID = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE "Order ID" = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getThree,
  getDataById,
  createNEW,
  updateRC,
  deleteID,
}
