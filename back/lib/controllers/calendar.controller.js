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
exports.del = exports.update = exports.getByDoctorID = exports.getByID = exports.get = exports.save = void 0;
const calendar_1 = require("../models/calendar");
const Model = calendar_1.default;
const title = 'Calendario';
exports.save = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, hours, doctorId } = req.body;
    yield hours.map((hour) => __awaiter(void 0, void 0, void 0, function* () {
        const reg = Model.findOne({ doctorId: doctorId, hour: hour.hour, date: date });
        if (reg._id) {
            Model.findOneAndUpdate({ _id: reg._id }, req.body, { new: true }, (err, event) => {
                if (err) {
                    console.log('ERROR', err);
                    res.status(501).json({
                        message: `Error al actualizar ${title}`,
                        data: null
                    });
                }
            });
        }
        else {
            const newCalendarReg = new Model({
                doctorId: doctorId,
                date: date,
                hour: hour.hour,
                inactive: hour.inactive
            });
            yield newCalendarReg.save();
        }
    }));
    res.status(200).json({
        message: `${title} Cread@`,
        data: null
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
exports.getByDoctorID = (req, res) => {
    Model.find({ doctorId: req.params.doctorid }, (err, event) => {
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
    yield Model.remove({ _id: req.params.id }, (err) => {
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
//# sourceMappingURL=calendar.controller.js.map