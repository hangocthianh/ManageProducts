import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-5 py-3">
      <div class="logo" (click)="goToHome()">Manage Products</div>
      <div
        class="collapse navbar-collapse d-flex  justify-content-end"
        id="navbarSupportedContent"
      >
        <button class="btn btn-outline-success my-2 my-sm-0" (click)="logout()">
          Logout
        </button>
      </div>
    </nav>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  url: string = '';
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.url = this.router.url;
  }

  goToHome() {
    this.router.navigate(['home']);
  }
  logout() {
    this.auth.logout();
  }
}
