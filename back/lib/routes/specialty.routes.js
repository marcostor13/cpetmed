"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specialty_controller_1 = require("./../controllers/specialty.controller");
const router = express_1.Router();
const title = 'specialty';
router.post(`/save-${title}`, specialty_controller_1.save);
router.get(`/get-${title}`, specialty_controller_1.get);
router.get(`/get-${title}-by-id/:id`, specialty_controller_1.getByID);
router.patch(`/update-${title}/:id`, specialty_controller_1.update);
router.delete(`/delete-${title}/:id`, specialty_controller_1.del);
exports.default = router;
//# sourceMappingURL=specialty.routes.js.map