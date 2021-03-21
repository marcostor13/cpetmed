"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipment_controller_1 = require("./../controllers/equipment.controller");
const router = express_1.Router();
const title = 'equipment';
router.post(`/save-${title}`, equipment_controller_1.save);
router.get(`/get-${title}`, equipment_controller_1.get);
router.get(`/get-${title}-by-id/:id`, equipment_controller_1.getByID);
router.patch(`/update-${title}/:id`, equipment_controller_1.update);
router.delete(`/delete-${title}/:id`, equipment_controller_1.del);
exports.default = router;
//# sourceMappingURL=equipment.routes.js.map