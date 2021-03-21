"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("./../controllers/appointment.controller");
const router = express_1.Router();
const title = 'appointment';
router.post(`/save-${title}`, appointment_controller_1.save);
router.post(`/update-${title}-data`, appointment_controller_1.updateAppointmentData);
router.get(`/get-${title}`, appointment_controller_1.get);
router.get(`/get-${title}-by-id/:id`, appointment_controller_1.getByID);
router.patch(`/update-${title}/:id`, appointment_controller_1.update);
router.post(`/delete-${title}`, appointment_controller_1.del);
exports.default = router;
//# sourceMappingURL=appointment.routes.js.map