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
exports.del = exports.update = exports.getByID = exports.get = exports.save = void 0;
const events_1 = require("../models/events");
const url_1 = require("../models/url");
const title = 'Evento';
exports.save = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { _id, date } = _a, reqBody = __rest(_a, ["_id", "date"]);
    const newEvent = new events_1.default(reqBody);
    if (reqBody.urlID) {
        const url = yield url_1.default.find({ _id: reqBody.urlID });
        if (url) {
            newEvent.listID = url[0].listID;
        }
    }
    yield newEvent.save();
    return res.status(200).json({
        message: `${title} Cread@`,
        data: newEvent
    });
});
exports.get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    events_1.default.find({}, (err, event) => {
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
    events_1.default.findById(req.params.id, (err, event) => {
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
    events_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, event) => {
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
    yield events_1.default.remove({ _id: req.params.id }, (err) => {
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
//# sourceMappingURL=events.controller.js.map