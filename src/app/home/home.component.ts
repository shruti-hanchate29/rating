import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { NavItem } from './home';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  opened: boolean = true;
  menu: NavItem [] = [
        {
          displayName: 'Home',
          iconName: 'home',
          route: '/demo',
        },
        {
          displayName: 'Services',
          iconName: 'ballot',
          children: [
            {
              displayName: 'Consulting',
              iconName: 'source',
              route: '/misexpedientes'
            },
            {
              displayName: 'Finance',
              iconName: 'source',
              route: '/todos'
            },
            {
              displayName: 'Tax and regulatory',
              iconName: 'source',
              route: '/todos'
            }
          ]
        },
        {
          displayName: 'Projects',
          iconName: 'work',
          children: [
            {
              displayName: 'Novodhi',
              iconName: 'business',
              route: '/misexpedientes'
            },
            {
              displayName: 'TCS',
              iconName: 'business',
              route: '/todos'
            }
          ]
        },
        {
          displayName: 'Rating Manager',
          iconName: 'device_hub',
          route: 'rating',
        },
        {
          displayName: 'Profiles',
          iconName: 'group',
          children: [
              {
                displayName: 'Admin Profile',
                iconName: 'admin_panel_settings',
                route: '/busquedaperfiles'
              },
              {
                displayName: 'User Profile',
                iconName: 'person',
                route: '/busquedaperfiles'
              }
            ]
          },
          {
            displayName: 'About Us',
            iconName: 'exit_to_app',
            route: 'entradasGADE',
          }
      ];
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}



