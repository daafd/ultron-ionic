import {Page, NavController,LocalStorage, Storage} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Http} from 'angular2/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/weather/weather.html',
})
export class WeatherPage {
  API: string = "http://localhost:3001/api";
  quote: string;
  error: string;
  weatherData:any;
  weatherError:string;
  auth: AuthService;
  local: Storage = new Storage(LocalStorage);
  user: string;


  constructor(public nav: NavController,private http: Http, private authHttp: AuthHttp) {
    this.auth=AuthService;
    this.getCurrentPosition();
    this.local.get('profile').then(profile => {
      this.user = profile;
      console.log(this.user);
    }).catch(error => {
      console.log(error);
    });
  }

  getCurrentPosition(){
    Geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.getWeatherNow(pos.coords.latitude,pos.coords.longitude);
    });
  }

  getQuote() {
    // Use a regular Http call to access unsecured routes
    this.http.get(`${this.API}/random-quote`)
        .map(res => res.text())
        .subscribe(
            data => this.quote = data,
            err => this.error = err
        );
  }

  getSecretQuote() {
    // Use authHttp to access secured routes
    this.authHttp.get(`${this.API}/protected/random-quote`)
        .map(res => res.text())
        .subscribe(
            data => this.quote = data,
            err => this.error = err
        );
  }

  getWeatherNow(lat,long) {
    //Use a regular Http call to get the weather based on our lat and long
    this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a2814607347e66e457d74dd92002c506`)
        .map(res => res.json())
        .subscribe(
            data => this.weatherData=data,
            err => this.weatherError = err
        );
  }
}
