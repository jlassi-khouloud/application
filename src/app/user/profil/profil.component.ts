import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profilForm;
  profil;
  profilToEdit;

  constructor(private userService: UserService) {
    this.profilForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      adresee: new FormControl('', [Validators.required]),
      cin: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      poste: new FormControl('', [Validators.required]),
      entreprise: new FormControl('', [Validators.required]),
      passe: new FormControl('', [Validators.required]),
    });
  }


  ngOnInit() {
    this.userService.getProfil().subscribe(res => {
      this.profil = res.json();
    });
  }

  profilEditBtn(id) {
    this.userService.getProfilById(id).subscribe(res => {
      console.log(res.json());
      this.profilToEdit = res.json();
      this.ngOnInit();
    });
  }

  profilDeleteBtn(id) {
    this.userService.deleteProfilById(id).subscribe(res => {
      console.log(res.json());
      this.ngOnInit();
    });
  }

  EditProfil(profil) {
    profil['nom'] = { nom: profil.nom };
    profil['prenom'] = { prenom: profil.prenom };
    profil['id'] = { id: profil.id };
    console.log(Profile);
    this.userService.updateProfilById(profil['id'], profil).subscribe(res => {
      this.ngOnInit();
      console.log(res.json());
    });
  }

}
