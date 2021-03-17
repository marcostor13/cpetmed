import * as express from 'express'
import * as cors from 'cors'
import * as morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import emailRoutes from './routes/email.routes'
import adminLandingRoutes from './routes/admin/landing.routes'
import adminCompanyRoutes from './routes/admin/company.routes'
import eventsRoutes from './routes/events.routes'
import urlRoutes from './routes/url.routes'
import dashboardRouter from './routes/dashboard.routes'

import './database'
import passportMiddleware from './middlewares/auth/passport'
import * as passport from 'passport'



const app: express.Application = express()

//Setting

app.set('port', 3002)
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
app.use(adminLandingRoutes)
app.use(adminCompanyRoutes)
app.use(emailRoutes)
app.use(urlRoutes)
app.use(eventsRoutes)
app.use(dashboardRouter)


//LOCAL



async function main() {
    app.listen(app.get('port'))
    console.log('Server on port ', app.get('port'))
    console.log(process.env.MONGODB_URI)
    console.log(process.env.MONGODB_USER)
    console.log(process.env.MONGODB_PASSWORD)
}

main()
export default app

