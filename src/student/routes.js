const {Router}=require('express');
const controller=require('./controller');
const router=Router();

router.get("/",controller.getStudents);
router.post("/",controller.addstudent);
router.get("/:id",controller.getStudentsbyid);
router.put("/:id",controller.updatestudent);
router.delete("/:id",controller.removestudent);
module.exports= router;
