import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  msgVal: string = '';

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
