"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendar_controller_1 = require("./../controllers/calendar.controller");
const router = express_1.Router();
const title = 'calendar';
router.post(`/save-${title}`, calendar_controller_1.save);
router.get(`/get-${title}`, calendar_controller_1.get);
router.get(`/get-${title}-by-id/:id`, calendar_controller_1.getByID);
router.get(`/get-${title}-by-doctorid/:doctorid`, calendar_controller_1.getByDoctorID);
router.patch(`/update-${title}/:id`, calendar_controller_1.update);
router.delete(`/delete-${title}/:id`, calendar_controller_1.del);
exports.default = router;
//# sourceMappingURL=calendar.routes.js.map