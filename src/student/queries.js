const getStudents="SELECT * FROM transactions";
const getStudentsbyid="SELECT * FROM transactions WHERE id= $1";
const checkuseridexist="SELECT s FROM transactions s WHERE s.id= $1";
const addstudent="INSERT INTO transactions (id,user_id,type,amount,description,date,created_at,updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const removestudent="DELETE FROM transactions WHERE id= $1";
const updatestudent="UPDATE transactions SET type = $1 WHERE id = $2";
module.exports={
  getStudents,
  getStudentsbyid,
  checkuseridexist,
  addstudent,
  removestudent,
  updatestudent,
};
