"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_controller_1 = require("./../controllers/patient.controller");
const router = express_1.Router();
const title = 'patient';
router.post(`/save-${title}`, patient_controller_1.save);
router.get(`/get-${title}`, patient_controller_1.get);
router.get(`/get-${title}-by-id/:id`, patient_controller_1.getByID);
router.get(`/get-${title}-by-email/:email`, patient_controller_1.getByEmail);
router.patch(`/update-${title}/:id`, patient_controller_1.update);
router.delete(`/delete-${title}/:id`, patient_controller_1.del);
exports.default = router;
//# sourceMappingURL=patient.routes.js.map