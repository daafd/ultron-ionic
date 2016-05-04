import {Page} from 'ionic-angular';
import {ProfilePage} from '../profile/profile';
import {WeatherPage} from '../weather/weather';
import {Type} from "angular2/core";


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  weatherPage: Type = WeatherPage;
  profilePage: Type = ProfilePage;

  constructor(){}
}
