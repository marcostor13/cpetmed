"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const auth_routes_1 = require("./routes/auth.routes");
const email_routes_1 = require("./routes/email.routes");
const user_routes_1 = require("./routes/user.routes");
const patient_routes_1 = require("./routes/patient.routes");
const specialty_routes_1 = require("./routes/specialty.routes");
const doctor_routes_1 = require("./routes/doctor.routes");
const procedure_routes_1 = require("./routes/procedure.routes");
const equipment_routes_1 = require("./routes/equipment.routes");
const calendar_routes_1 = require("./routes/calendar.routes");
const appointment_routes_1 = require("./routes/appointment.routes");
require("./database");
const passport_1 = require("./middlewares/auth/passport");
const passport = require("passport");
const app = express();
//Setting
app.set('port', 3002);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: true
}));
//middlewares
app.use(morgan('dev'));
app.use(passport.initialize());
passport.use(passport_1.default);
//Routes
app.use(auth_routes_1.default);
app.use(email_routes_1.default);
app.use(user_routes_1.default);
app.use(patient_routes_1.default);
app.use(specialty_routes_1.default);
app.use(doctor_routes_1.default);
app.use(procedure_routes_1.default);
app.use(equipment_routes_1.default);
app.use(calendar_routes_1.default);
app.use(appointment_routes_1.default);
//LOCAL
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.listen(app.get('port'));
        console.log('Server on port ', app.get('port'));
    });
}
main();
exports.default = app;
//# sourceMappingURL=index.js.map