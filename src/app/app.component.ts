import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { buildUrl } from 'osu-web.js';
import { environment } from '../environments/environment';
import { User } from './models/user';
import { CommonModule } from '@angular/common';
import { OsuApiService } from './services/osu-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  loading: boolean = true;
  userInfo: User | undefined;


  osuApi: OsuApiService = inject(OsuApiService)

  ngOnInit(): void {
    this.osuApi.getSelf().subscribe( res => {
      this.userInfo = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  login() {
    window.location.href = buildUrl.authRequest(44993, `${environment.apiUrl}/api/auth/cb`, ['identify', 'public']);
  }


}
