"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const history_controller_1 = require("./../controllers/history.controller");
const router = express_1.Router();
const title = 'history';
router.post(`/save-${title}`, history_controller_1.save);
router.get(`/get-${title}`, history_controller_1.get);
router.get(`/get-${title}-by-id/:id`, history_controller_1.getByID);
router.patch(`/update-${title}/:id`, history_controller_1.update);
router.delete(`/delete-${title}/:id`, history_controller_1.del);
exports.default = router;
//# sourceMappingURL=history.routes.js.map