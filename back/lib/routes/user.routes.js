"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./../controllers/user.controller");
const router = express_1.Router();
const title = 'user';
router.post(`/save-${title}`, user_controller_1.save);
router.get(`/get-${title}`, user_controller_1.get);
router.get(`/get-${title}-by-id/:id`, user_controller_1.getByID);
router.patch(`/update-${title}/:id`, user_controller_1.update);
router.delete(`/delete-${title}/:id`, user_controller_1.del);
exports.default = router;
//# sourceMappingURL=user.routes.js.map