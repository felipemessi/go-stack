import Appointment from '../models/Appointment'
import { isEqual } from 'date-fns'

interface CreateAppointmentDTO {
    provider : string
    date: Date
}

class AppointmentsRepository {
    private appointments: Appointment[]

    constructor() {
        this.appointments = []
    }

    // return all appointments
    public all() : Appointment[] {
        return this.appointments
    }

    // check if you have an appointment on the same date.
    // if yes: returns the schedule, if not: returns null
    public findByDate(date:Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date))

        return findAppointment || null
    }

    // create an appointment
    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({provider, date})

        this.appointments.push(appointment)

        return appointment
    }
}

export default AppointmentsRepository
