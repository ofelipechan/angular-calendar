export class Reminder {
    date: Date;
    title: string;
    description?: string;
    city?: string;
    forecast?: string;
    creationDate: Date;

    constructor(date: string | Date = new Date(), title: string = '', description?: string, city?: string, forecast?: string) {
        this.date = typeof (date) === 'string' ? new Date(date) : date;
        this.title = title;
        this.description = description;
        this.city = city;
        this.forecast = forecast;
    }
}