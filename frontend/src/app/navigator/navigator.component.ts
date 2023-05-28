import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {AuthService} from "../servis/auth.service";


@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  showFiller = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
  ) {}

  hasRole(role: string): boolean {
    return this.auth.user?.roles.includes(role) || false;
  }

  ngOnInit(): void {
  }


  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  logOut() {
  this.auth.logout();
  }
}
