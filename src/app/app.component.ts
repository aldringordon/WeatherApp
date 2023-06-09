import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private weatherService: WeatherService) { }

  weatherData?: WeatherData;

  temperature?: number;
  maxTemperature?: number;
  minTemperature?: number;
  humidity?: number;
  windSpeed?: number;

  cityName: string = 'Perth';

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  onSubmit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string): void {
    this.weatherService.getWeatherData(cityName)
    .subscribe({
      next: (data) => {
        this.weatherData = data;
        this.temperature = this.convertFarToCelcius(data.main.temp);
        this.maxTemperature = this.convertFarToCelcius(data.main.temp_max);
        this.minTemperature = this.convertFarToCelcius(data.main.temp_min);
        this.humidity = data.main.humidity;
        this.windSpeed = data.wind.speed;
        console.log(data);
      }
    }); 
  }

  convertFarToCelcius(far: number): number {
    return (far - 32) * 5 / 9;
  }
}
