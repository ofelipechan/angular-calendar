export class Reminder {
    date: Date;
    color: string;
    title: string;
    description?: string;
    city?: string;
    forecast?: string;
    creationDate: Date;

    constructor(
        date: string | Date = new Date(),
        title: string = '',
        description?: string,
        city?: string,
        color: string = 'default',
        forecast?: string
        ) {
        this.date = typeof (date) === 'string' ? new Date(date) : date;
        this.title = title;
        this.description = description;
        this.city = city;
        this.color = color;
        this.forecast = forecast;
    }
}