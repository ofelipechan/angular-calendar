export class Reminder {
    date: Date;
    title: string;
    description?: string;
    city?: string;
    forecast?: string;

    constructor(date: Date, title: string, description?: string, city?: string, forecast?: string) {
        this.date = date;
        this.title = title;
        this.description = description;
        this.city = city;
        this.forecast = forecast;
    }
}