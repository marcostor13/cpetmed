import { Request, Response } from "express";
import Doctor from "../models/doctor";
import Specialty from "../models/specialty";


const email =  'marcostor13@gmail.com';
const pass =  'bpoheocqnjsyksdm';

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
})

export async function sendEmailPatient(req: Request, res: Response) {

    const appointmentData = req.body

    const doctor = await Doctor.findById(appointmentData.doctorid)
    const specialty = await Specialty.findById(appointmentData.specialtyid)

    const data = {
        date: appointmentData.date,
        hour: appointmentData.hour,
        doctor: doctor ? doctor.name : null,
        address: 'Av. Petit Thouars 4377 - Miraflores  - Teléfono (01) 3082808',
        specialty: specialty ? specialty.name : null
    }

    const mailOptions = {
        from: `Cpetmed <${email}>`,
        to: appointmentData.dataUser.email,
        subject: 'Reserva de citas CpetMed',
        html: getHtml('1', data)
    };

    return transporter.sendMail(mailOptions, (erro: any, info: any) => {
        if (erro) {
            return handleError(res, erro.toString())
        }
        return res.status(200).send({ message: 'Su cita fue creada, gracias por confiar en nosotros.', data: null });
    });

}

export async function sendEmailAdmin(req: Request, res: Response) {

    const appointmentData = req.body

    const doctor = await Doctor.findById(appointmentData.doctorid)
    const specialty = await Specialty.findById(appointmentData.specialtyid)

    const data = {
        date: appointmentData.date,
        hour: appointmentData.hour,
        doctor: doctor ? doctor.name : null,
        address: 'Av. Petit Thouars 4377 - Miraflores  - Teléfono (01) 3082808',
        specialty: specialty ? specialty.name : null
    }

    const mailOptions = {
        from: `Cpetmed <${email}>`,
        to: email,
        subject: 'Nueva Reserva de citas CpetMed',
        html: getHtml('1', data)
    };

    return transporter.sendMail(mailOptions, (erro: any, info: any) => {
        if (erro) {
            return handleError(res, erro.toString())
        }
        return res.status(200).send({ message: 'Su cita fue creada, gracias por confiar en nosotros.', data: null });
    });

}

export async function sendEmail(req: Request, res: Response) {

    const { dest, fromname, from, subject, type, data } = req.body

    const mailOptions = {
        from: `${fromname} <${from}>`,
        to: dest,
        subject: subject,
        html: getHtml(type, data)
    };

    return transporter.sendMail(mailOptions, (erro: any, info: any) => {
        if (erro) {
            return handleError(res, erro.toString())
        }
        return res.status(200).send({ message: 'Mensaje enviado', data: null });
    });

}

function getHtml(type: any, data: any) { 
    
    
    let dat = data


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
                `

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
                `
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
                `
        default:
            return 'Error en el mensaje, por favor contáctenos'

    }



}


function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err}` });
}
