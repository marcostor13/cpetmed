"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const procedure_controller_1 = require("./../controllers/procedure.controller");
const router = express_1.Router();
const title = 'procedure';
router.post(`/save-${title}`, procedure_controller_1.save);
router.get(`/get-${title}`, procedure_controller_1.get);
router.get(`/get-${title}-by-id/:id`, procedure_controller_1.getByID);
router.patch(`/update-${title}/:id`, procedure_controller_1.update);
router.delete(`/delete-${title}/:id`, procedure_controller_1.del);
exports.default = router;
//# sourceMappingURL=procedure.routes.js.map