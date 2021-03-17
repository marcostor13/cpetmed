"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const router = express_1.Router();
router.get('/get-data-dashboard/:userid', dashboard_controller_1.getData);
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map