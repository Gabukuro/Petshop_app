import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }


  public appPages = [
    { title: 'Agenda', url: '/dashboard/jobs', icon: 'today' },
    { title: 'Pets', url: '/dashboard/pets', icon: 'pets' },
    { title: 'Serviços', url: '/dashboard/services', icon: 'favorite' },
    { title: 'Clientes', url: '/dashboard/clients', icon: 'face' },
  ];

  currenPageTitle: any = '';

  ngOnInit(): void {
    let currentAppPage = this.appPages.find(item => {
      return this.router.url == item.url;
    });

    this.currenPageTitle = currentAppPage?.title;
  }

}
