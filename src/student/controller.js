const pool=require('../../db');
const query1=require('./queries');

//select all ffrom tables
const getStudents=(req,res)=>{
   pool.query(query1.getStudents,(error,results)=>{
    if(error) throw error;
    res.status(200).json(results.rows);
   })
};
//select specific id from table
const getStudentsbyid=(req,res)=>{
    const id=parseInt(req.params.id);
    pool.query(query1.getStudentsbyid,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

// Example code with return statements
const addstudent = (req, res) => {
    const { id, user_id, type, amount, description, date, created_at, updated_at } = req.body;

    // Check if user_id exists
    pool.query(query1.checkuseridexist, [id], (error, results) => {
        if (error) {
            console.error("Error checking user existence:", error);
            return res.status(500).send("An unexpected error occurred");
        }

        if (results.rows.length) {
            return res.status(400).send("User id already exists");
        }

        // Add user to db
        pool.query(query1.addstudent, [id, user_id, type, amount, description, date, created_at, updated_at], (error, results) => {
            if (error) {
                console.error("Error adding user:", error);
                return res.status(500).send("An unexpected error occurred");
            }
            res.status(201).send("User created successfully");
            console.log("User created");
        });
    });
};
const removestudent = (req, res) => {
    const id = parseInt(req.params.id);

    // Check if student exists
    pool.query(query1.removestudent, [id], (error, results) => {
        if (error) {
            console.error("Error checking student existence:", error);
            return res.status(500).send("An unexpected error occurred");
        }

        if (results.rowCount === 0) {
            console.log("No rows were deleted.");
            console.log(results.rowCount);
            return res.status(404).send("User is not present in the database and cannot be removed.");
        }

        // Remove student from the database
        pool.query(query1.removestudent, [id], (error, results) => {
            if (error) {
                console.error("Error removing student:", error);
                return res.status(500).send("An unexpected error occurred while removing the student.");
            }
            // Send success message after successful deletion
            res.status(200).send("Student removed successfully");
            console.log("DELETE RECORD SUCCESFULLY");
        });
    });
};

const updatestudent=(req,res)=>{
    const id = parseInt(req.params.id);
    const {type}=req.body;

    pool.query(query1.getStudentsbyid ,[id],(error,results)=>{
        if (error) {
            console.error("Error checking student existence:", error);
            return res.status(500).send("An unexpected error occurred");
        }

        if (results.rowCount === 0) {
            console.log("No rows were deleted.");
            console.log(results.rowCount);
            return res.status(404).send("User is not present in the database to update.");
        }

        pool.query(query1.updatestudent,[type,id],(error,results)=>{
            if (error) {
                console.error("Error removing student:", error);
                return res.status(500).send("An unexpected error occurred while removing the student.");
            }
            res.status(200).send("Student updated succcesfully");
        });
    });
};
module.exports={
    getStudents,
    getStudentsbyid,
    addstudent,
    removestudent,
    updatestudent,
};