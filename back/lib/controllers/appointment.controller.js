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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.update = exports.getByID = exports.get = exports.updateAppointmentData = exports.save = void 0;
const appointment_1 = require("../models/appointment");
const doctor_1 = require("../models/doctor");
const specialty_1 = require("../models/specialty");
const calendar_1 = require("../models/calendar");
const Model = appointment_1.default;
const title = 'Cita';
exports.save = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { _id } = _a, reqBody = __rest(_a, ["_id"]);
    const doctor = yield doctor_1.default.findById(reqBody.doctorid);
    const specialty = yield specialty_1.default.findById(reqBody.specialtyid);
    const dataAppointment = Object.assign(Object.assign({}, reqBody), { specialty: specialty === null || specialty === void 0 ? void 0 : specialty.name, doctor: doctor === null || doctor === void 0 ? void 0 : doctor.name });
    const newElement = new Model(dataAppointment);
    yield newElement.save();
    calendar_1.default.findOneAndUpdate({ doctorId: reqBody.doctorid, date: reqBody.date, hour: reqBody.hour }, { inactive: true }, { new: true }, (err, event) => {
        if (err) {
            console.log('Error', err);
        }
    });
    return res.status(200).json({
        message: `Su cita fue creada, gracias por confiar en nosotros.`,
        data: newElement
    });
});
exports.updateAppointmentData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentAppointment, newAppointmentData } = req.body;
    calendar_1.default.findOneAndUpdate({ doctorId: currentAppointment.doctorid, date: currentAppointment.date, hour: currentAppointment.hour }, { inactive: false }, { new: true }, (err, event) => {
        if (err) {
            console.log('Error', err);
        }
    });
    calendar_1.default.findOneAndUpdate({ doctorId: newAppointmentData.doctorid, date: newAppointmentData.date, hour: newAppointmentData.hour }, { inactive: true }, { new: true }, (err, event) => {
        if (err) {
            console.log('Error', err);
        }
    });
    Model.findOneAndUpdate({ _id: newAppointmentData._id }, newAppointmentData, { new: true }, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al actualizar ${title}`,
                data: null
            });
        }
        res.status(200).json({
            message: `${title} actualizad@`,
            data: event
        });
    });
});
exports.get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Model.find({}, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            });
        }
        res.status(200).json({
            message: '',
            data: event
        });
    });
});
exports.getByID = (req, res) => {
    Model.findById(req.params.id, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}`,
                data: null
            });
        }
        res.status(200).json({
            message: '',
            data: event
        });
    });
};
exports.update = (req, res) => {
    Model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al actualizar ${title}`,
                data: null
            });
        }
        res.status(200).json({
            message: `${title} actualizad@`,
            data: event
        });
    });
};
exports.del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    console.log('REQ', reqBody);
    calendar_1.default.findOneAndUpdate({ doctorId: reqBody.doctorid, date: reqBody.date, hour: reqBody.hour }, { inactive: false }, { new: true }, (err, event) => {
        if (err) {
            console.log('Error', err);
        }
    });
    yield Model.remove({ _id: reqBody._id }, (err) => {
        if (err) {
            res.status(501).json({
                message: `Error al eliminar ${title}`,
                data: null
            });
        }
    });
    return res.status(200).json({
        message: `${title} eliminad@`,
        data: null
    });
});
//# sourceMappingURL=appointment.controller.js.map