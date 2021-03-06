import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UsersComponent implements OnInit {



  userToEdit: any;
  settings = {
    mode: 'external',
    columns: {
      id: {
        title: 'ID',
        filter: false
      },
      name: {
        title: ' name',
        filter: false
      },
      lastname: {
        title: 'lastname',
        filter: false
      },

      email: {
        title: 'Email',
        filter: false
      },
    }
  };

  data = [
    {
      'id': 1,
      'nom': 'chehir',
      'prenom': 'dhwedi',
      'pass': 'fivepts',
      'email': 'fivepoints.com',
    }
  ];
  source: LocalDataSource;

  constructor(private adminService: AdminService) {

  }

  ngOnInit() {
    this.adminService.getUserByRole('user').subscribe(res => {
      this.data = res.json();
      this.source = new LocalDataSource(this.data);
    });
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'Nom',
        search: query
      },
      {
        field: 'prenom',
        search: query
      },
      {
        field: 'pass',
        search: query
      },
      {
        field: 'email',
        search: query
      }
    ], false);
  }
  userEditBtn(id) {
    this.adminService.getEcranById(id).subscribe(res => {
      console.log(res.json());
      this.userToEdit = res.json();
      this.ngOnInit();
    });
  }

  userDelBtn(id) {
    this.adminService.deleteuser(id).subscribe(res => {
      console.log(res.json());
      this.ngOnInit();
    });
  }

  AjoutUser(user) {
    user['name'] = {};
    user['lastname'] = {};
    user['email'] = {};
    user['password'] = {};
    console.log(user);
    this.adminService.AddnewEcran(user).subscribe(res => {
      this.ngOnInit();
      console.log(res.json());
    });
    this.adminService.AddnewUser(user).subscribe(res => {
      this.ngOnInit();
      console.log(res.json());
    });
  }
}

