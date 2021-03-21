export class CCalendar {
    constructor() {
        this._id = null
        this.doctorId = ''
        this.date = ''
        this.hour = ''
        this.inactive = false
    }
    _id: string
    doctorId: string
    date: string
    hour: string
    inactive: boolean
}


export class CListHours {    
    hour: string
    inactive: boolean
}

export class CCalendarFormat {
    date: string
    hours: CListHours[]
}
