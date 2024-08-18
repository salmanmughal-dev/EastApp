const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "localhost",
  user: "Salman",
  password: "Awazedost@159",
  database: "eastapp"
});



// TRLezt-IkqEc03iRFWv8bg --> Password


// connection string

// curl --create-dirs -o $HOME/.postgresql/root.crt 'https://cockroachlabs.cloud/clusters/14c82ef9-2150-41da-a268-0c38ae9cde08/cert'

module.exports = pool;