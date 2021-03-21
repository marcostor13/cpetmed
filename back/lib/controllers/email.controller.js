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
exports.sendEmail = exports.sendEmailAdmin = exports.sendEmailPatient = void 0;
const doctor_1 = require("../models/doctor");
const specialty_1 = require("../models/specialty");
const email = 'marcostor13@gmail.com';
const pass = 'bpoheocqnjsyksdm';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    // auth: {
    //     user: 'citas.cpetmed@gmail.com',
    //     pass: 'bhlewvcjxhghmmof'
    // },
    auth: {
        user: email,
        pass: pass
    },
    tls: {
        rejectUnauthorized: false
    }
});
function sendEmailPatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const appointmentData = req.body;
        const doctor = yield doctor_1.default.findById(appointmentData.doctorid);
        const specialty = yield specialty_1.default.findById(appointmentData.specialtyid);
        const data = {
            date: appointmentData.date,
            hour: appointmentData.hour,
            doctor: doctor ? doctor.name : null,
            address: 'Av. Petit Thouars 4377 - Miraflores  - Teléfono (01) 3082808',
            specialty: specialty ? specialty.name : null
        };
        const mailOptions = {
            from: `Cpetmed <${email}>`,
            to: appointmentData.dataUser.email,
            subject: 'Reserva de citas CpetMed',
            html: getHtml('1', data)
        };
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return handleError(res, erro.toString());
            }
            return res.status(200).send({ message: 'Su cita fue creada, gracias por confiar en nosotros.', data: null });
        });
    });
}
exports.sendEmailPatient = sendEmailPatient;
function sendEmailAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const appointmentData = req.body;
        const doctor = yield doctor_1.default.findById(appointmentData.doctorid);
        const specialty = yield specialty_1.default.findById(appointmentData.specialtyid);
        const data = {
            date: appointmentData.date,
            hour: appointmentData.hour,
            doctor: doctor ? doctor.name : null,
            address: 'Av. Petit Thouars 4377 - Miraflores  - Teléfono (01) 3082808',
            specialty: specialty ? specialty.name : null
        };
        const mailOptions = {
            from: `Cpetmed <${email}>`,
            to: email,
            subject: 'Nueva Reserva de citas CpetMed',
            html: getHtml('1', data)
        };
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return handleError(res, erro.toString());
            }
            return res.status(200).send({ message: 'Su cita fue creada, gracias por confiar en nosotros.', data: null });
        });
    });
}
exports.sendEmailAdmin = sendEmailAdmin;
function sendEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { dest, fromname, from, subject, type, data } = req.body;
        const mailOptions = {
            from: `${fromname} <${from}>`,
            to: dest,
            subject: subject,
            html: getHtml(type, data)
        };
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return handleError(res, erro.toString());
            }
            return res.status(200).send({ message: 'Mensaje enviado', data: null });
        });
    });
}
exports.sendEmail = sendEmail;
function getHtml(type, data) {
    let dat = data;
    switch (type) {
        case '1':
            return `
                <h1>Cita creada Cpetmed</h1><br>
                <p>Su cita ha sido recibida, le enviaremos por este medio la confirmación de la disponibilidad en breve<p>
                <h3 style="margin-top: 10px">Datos de la cita</h3>
                <ul>
                    <li><label style="min-width: 250px">Fecha</label> : ${dat.date}</li>
                    <li><label style="min-width: 250px">Hora</label> : ${dat.hour}</li>
                    <li><label style="min-width: 250px">Doctor</label> : ${dat.doctor}</li>
                    <li><label style="min-width: 250px">Dirección</label> : ${dat.address}</li>
                    <li><label style="min-width: 250px">Especialidad</label> : ${dat.specialty}</li>                
                </ul>    
                `;
        case '2':
            return `
                <h1>Cita creada Cpetmed</h1><br>
                <p>Estimado Doctor, hemos recibido una solicitud de cita con los siguientes datos:<p>
                <h3 style="margin-top: 10px">Datos de la cita</h3>
                <ul>
                    <li><label style="min-width: 250px">Fecha</label> : ${dat.date}</li>
                    <li><label style="min-width: 250px">Hora</label> : ${dat.time}</li>
                    <li><label style="min-width: 250px">Doctor</label> : ${dat.doctor}</li>
                    <li><label style="min-width: 250px">Dirección</label> : ${dat.address}</li>
                    <li><label style="min-width: 250px">Especialidad</label> : ${dat.specialty}</li>                
                </ul>    
                `;
        case '3':
            return `
                <h1>Nueva Cita creada Cpetmed</h1><br>
                <p>Hola administrador, se ha registrado una nueva cita por la página web:<p>
                <h3 style="margin-top: 10px">Datos de la cita</h3>
                <ul>
                    <li><label style="min-width: 250px">Fecha</label> : ${dat.date}</li>
                    <li><label style="min-width: 250px">Hora</label> : ${dat.time}</li>
                    <li><label style="min-width: 250px">Doctor</label> : ${dat.doctor}</li>
                    <li><label style="min-width: 250px">Dirección</label> : ${dat.address}</li>
                    <li><label style="min-width: 250px">Especialidad</label> : ${dat.specialty}</li>                
                </ul>    
                `;
        default:
            return 'Error en el mensaje, por favor contáctenos';
    }
}
function handleError(res, err) {
    return res.status(500).send({ message: `${err}` });
}
//# sourceMappingURL=email.controller.js.map