"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = require("./../controllers/events.controller");
const router = express_1.Router();
router.post('/save-event', events_controller_1.save);
router.get('/get-events', events_controller_1.get);
router.get('/get-event-by-id/:id', events_controller_1.getByID);
router.patch('/update-event/:id', events_controller_1.update);
router.delete('/delete-event/:id', events_controller_1.del);
exports.default = router;
//# sourceMappingURL=events.routes.js.map