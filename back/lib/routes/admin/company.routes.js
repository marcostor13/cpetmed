"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_controller_1 = require("./../../controllers/admin/company.controller");
const router = express_1.Router();
router.post('/save-company', company_controller_1.save);
router.get('/get-companies/:userid', company_controller_1.get);
router.get('/get-company-by-id/:id', company_controller_1.getByID);
router.patch('/update-company/:id', company_controller_1.update);
router.delete('/delete-company/:id', company_controller_1.del);
exports.default = router;
//# sourceMappingURL=company.routes.js.map