import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      adresse: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      CIN: new FormControl('', [Validators.required, Validators.minLength(8), Validators.max(99999999)]),
      poste: new FormControl('', [Validators.required]),
      entreprise: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
    });
  }
  errMessage;
  registerForm;
  user;
  ngOnInit() {

  }

  register() {
    this.user = this.registerForm.value;
    this.authService.getregister(this.user).subscribe(res => {
      console.log(res);
    });

  }

}


// ng s -o -p 4201 --host 0.0.0.0

// go to chrome and open 192.168.0.20:4201

// chehir@fivep.tn // 12345
