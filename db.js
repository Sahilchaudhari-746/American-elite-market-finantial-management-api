

const Pool=require('pg').Pool;
 
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"finance_management",
    password:"sahil@2003",
    port:5433,
});

module.exports=pool;