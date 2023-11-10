// import express from "express"
// import { addDepartment, departmentAddLab, getDepartment, getLabBydept } from "../controllers/department.js";

// const router = express.Router();

// router.post('/department/add-department',addDepartment);
// router.get('/department/get-department',getDepartment);
// router.post('/department/add-department-lab',departmentAddLab);
// router.get('/department/get-department-lab',getLabBydept);

// export default router
import express from "express";
import {
  addDepartment,
  getDepartment,
  departmentAddLab,
  getLabBydept,
  getById,
  getByName,
} from "../controllers/department.js";

const router = express.Router();

router.post("/department/add-department", addDepartment);
router.get("/department/get-department", getDepartment);
router.post("/department/add-department-lab", departmentAddLab);
router.get("/department/get-department-lab", getLabBydept);
router.get("/department/get-department/:id", getById);
router.get("/department/get-department-by-name/:name", getByName);
export default router;
