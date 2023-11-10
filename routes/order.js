import express from "express" 

import { isAuthenticated } from "../middlewares/auth.js"
import { AcceptOrder, AcceptOrderforApprover, ApproverOrder, InwardOrders, RejectOrder, RejectOrderforApprover, createOrder, filterOrder, getApprovedOrder, getRejectedOrder, getallOrderById, getallOrders, getallOrdersforIntiatorSuperAdminandAdmin, processOrder } from "../controllers/order.js"

const router=express.Router()

router.post("/order/add-order",isAuthenticated,createOrder)
router.get("/order/get-order",isAuthenticated,getallOrders)
router.get("/order/get-order-intiator-superadmin-admin",isAuthenticated,getallOrdersforIntiatorSuperAdminandAdmin)
router.get("/order/filter",isAuthenticated,filterOrder)
router.post("/order/accept/:id",isAuthenticated,AcceptOrder)
router.post("/order/reject/:id",isAuthenticated,RejectOrder)
router.get("/order/getById/:id",isAuthenticated,getallOrderById)
router.get("/order/getapproved",isAuthenticated,getApprovedOrder)
router.get("/order/getrejected",isAuthenticated,getRejectedOrder)
router.put("/process/order/:id",isAuthenticated,processOrder)
router.get("/order/remarkedorders",isAuthenticated,ApproverOrder)
router.post("/order/acceptforapprover/:id",isAuthenticated,AcceptOrderforApprover)
router.post("/order/rejectforapprover/:id",isAuthenticated,RejectOrderforApprover)
router.get("/order/inwardorders",isAuthenticated,InwardOrders)

export default router