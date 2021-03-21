"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctor_controller_1 = require("./../controllers/doctor.controller");
const router = express_1.Router();
const title = 'doctor';
router.post(`/save-${title}`, doctor_controller_1.save);
router.get(`/get-${title}`, doctor_controller_1.get);
router.get(`/get-${title}-by-id/:id`, doctor_controller_1.getByID);
router.get(`/get-${title}-by-email/:email`, doctor_controller_1.getByEmail);
router.get(`/get-${title}-by-specialtyid/:specialtyid`, doctor_controller_1.getBySpecialty);
router.patch(`/update-${title}/:id`, doctor_controller_1.update);
router.delete(`/delete-${title}/:id`, doctor_controller_1.del);
exports.default = router;
//# sourceMappingURL=doctor.routes.js.map