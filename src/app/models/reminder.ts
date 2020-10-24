export class Reminder {
    id?: string;
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

        if (title) {
            this.id = createId();
            this.title = title;
            this.description = description;
            this.city = city;
            this.color = color;
            this.forecast = forecast;
            this.creationDate = new Date();
        }
    }

}

function createId() {
    return Math.random().toString(36).substr(2, 9);
}

