import {Page, Storage, LocalStorage} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {FORM_DIRECTIVES} from 'angular2/common';
import {JwtHelper} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth';
import 'rxjs/add/operator/map'
import {Alert} from "ionic-angular/index";
import {NavController} from "ionic-angular/index";

@Page({
  templateUrl: 'build/pages/profile/profile.html',
  directives: [FORM_DIRECTIVES]
})
export class ProfilePage {
  LOGIN_URL: string = "http://localhost:3001/sessions/create";
  SIGNUP_URL: string = "http://localhost:3001/users";

  auth: AuthService;
  // When the page loads, we want the Login segment to be selected
  authType: string = "login";
  // We need to set the content type for the server
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});
  error: string;
  jwtHelper: JwtHelper = new JwtHelper();
  local: Storage = new Storage(LocalStorage);
  user: string;

  constructor(private http: Http,public nav: NavController) {
    this.auth = AuthService;
    this.local.get('profile').then(profile => {
      this.user =profile;
    }).catch(error => {
      console.log(error);
    });
  }

  login(credentials) {
    this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
            data => this.authSuccess(data.id_token),
            err => this.error = err
        );
  }

  signup(credentials) {
    this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
            data => this.authSuccess(data.id_token),
            err => this.error = err
        );
  }

  logout() {
    this.local.remove('id_token');
    this.local.remove('profile');
    this.user = null;
  }

  authSuccess(token) {
    this.error = null;
    this.local.set('id_token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
    this.local.set('profile',this.user);

    let alert = Alert.create({
      title: 'Welcome!',
      subTitle: 'Hello, '+this.user+ ' , You can now check the weather for rainy days!',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }
}