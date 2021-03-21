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
exports.del = exports.update = exports.getByID = exports.get = exports.save = exports.singIn = exports.singUp = void 0;
const user_1 = require("../models/user");
const jwt = require("jsonwebtoken");
const keys = require("../keys");
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, keys.mongodb.jwtSecret, {
        expiresIn: 86400
    });
}
exports.singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role, email, password } = req.body;
    if (!name || !role || !email || !password) {
        return res.status(400).json({ message: 'Debe completar todos los datos' });
    }
    const user = yield user_1.default.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(200).json(newUser);
});
exports.singIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Debe completar todos los datos' });
    }
    const user = yield user_1.default.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: 'El usuario no existe' });
    }
    const isEqualPassword = yield user.comparePassword(password);
    if (isEqualPassword) {
        return res.status(200).json({
            _id: user._id,
            name: user.name || '',
            email: user.email,
            role: user.role || '',
            token: createToken(user)
        });
    }
    return res.status(400).json({ message: 'El correo o la contraseña son incorrectas' });
});
const Model = user_1.default;
const title = 'Usuario';
exports.save = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { _id, date } = _a, reqBody = __rest(_a, ["_id", "date"]);
    const user = yield Model.find({ email: reqBody.email });
    if (user.length > 0) {
        return res.status(501).json({
            message: `El ${title} ya existe, elija otro`,
            data: null
        });
    }
    else {
        const newElement = new Model(reqBody);
        yield newElement.save();
        return res.status(200).json({
            message: `${title} Cread@`,
            data: newElement
        });
    }
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
//# sourceMappingURL=user.controller.js.map