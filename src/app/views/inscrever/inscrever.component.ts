import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-inscrever',
  templateUrl: './inscrever.component.html',
  styleUrls: ['./inscrever.component.css']
})
export class InscreverComponent implements OnInit {

  public formInscrever: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private router: Router,
    private authService: AuthService
  ) {
    this.formInscrever = fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  public signInGoogle(): void {
    this.authService.authenticateByGoogle().subscribe(credencials => {
      this.notification.showMessage("Bem-vindo(a)!");
      this.router.navigate(["/home"]);
    })
  }

  public createUserEmailAndPassword(): void {
    if(this.formInscrever.valid) {
      const user: User = this.formInscrever.value;
      this.authService.createUserEmailAndPassword(user).subscribe(response => {
        this.notification.showMessage("Usuário cadastrado.");
        this.router.navigate(["/login"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

}
