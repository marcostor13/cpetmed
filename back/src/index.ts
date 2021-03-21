import * as express from 'express'
import * as cors from 'cors'
import * as morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import emailRoutes from './routes/email.routes'
import userRoutes from './routes/user.routes'
import patientRoutes from './routes/patient.routes'
import specialtyRoutes from './routes/specialty.routes'
import doctorRoutes from './routes/doctor.routes'
import procedureRoutes from './routes/procedure.routes'
import equipmentRoutes from './routes/equipment.routes'
import calendarRoutes from './routes/calendar.routes'
import appointmentRoutes from './routes/appointment.routes'


import './database'
import passportMiddleware from './middlewares/auth/passport'
import * as passport from 'passport'



const app: express.Application = express()

//Setting

app.set('port', 3003)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin : true
}))


//middlewares

app.use(morgan('dev'))
app.use(passport.initialize())
passport.use(passportMiddleware)
//Routes


app.use(authRoutes)
app.use(emailRoutes)
app.use(userRoutes)
app.use(patientRoutes)
app.use(specialtyRoutes)
app.use(doctorRoutes)
app.use(procedureRoutes)
app.use(equipmentRoutes)
app.use(calendarRoutes)
app.use(appointmentRoutes)



//LOCAL



async function main() {
    app.listen(app.get('port'))
    console.log('Server on port ', app.get('port'))
}

main()
export default app

