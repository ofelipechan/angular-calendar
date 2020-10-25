import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.weatherApiUrl;
  private key = environment.keyWeatherAPI;

  constructor(private http: HttpClient) { }

  async autoComplete(city: string) {
    const params = new HttpParams()
      .set('q', city)
      .set('key', this.key);
    try {
      const response: any = await this.http.get(`${this.apiUrl}/search.json`, { params }).toPromise();
      return response.map((value) => {
        return { id: value.id, name: value.name };
      });
    } catch (error) {
      console.error('An error occurred while trying to get weather forecast', error);
    }
  }

  async getWeatherForecast(city: string = 'Paris', date: string) {
    const params = new HttpParams()
      .set('q', city)
      .set('dt', date)
      .set('key', this.key);
    try {
      const response: any = await this.http.get(`${this.apiUrl}/forecast.json`, { params }).toPromise();
      if (response.forecast.forecastday.length > 0) {
        return response.forecast.forecastday[0].day;
      }
      return response.forecast;
    } catch (error) {
      console.error('An error occurred while trying to get weather forecast', error);
    }
  }
}
