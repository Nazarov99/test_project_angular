import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Users} from "../../Interfaces/users";
import {cloneDeep} from "lodash";
import {InternalApiService} from "../../Services/internal-api.service";
import {NotificationService} from "../../Services/notification.service";
import {AddUserComponent} from "../../Shared/add-user/add-user.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loader = false;
  public users: Users[];
  public current_page: number;
  public per_page: number;
  public total: number;
  filterParams: any = {
    page: 1,
    pageSize: 10,
    name: '',
  };

  constructor(private router: Router,
              private internalApi: InternalApiService,
              private notification: NotificationService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getContactList();
  }

  getContactList(){
    this.loader = true;
    const filterParams = cloneDeep(this.filterParams);
    this.internalApi.getContactList(filterParams)
      .subscribe((res: any) => {
        this.users = res.data;
        this.current_page = res.current_page;
        this.per_page = res.per_page;
        this.total = res.total;
        this.loader = false;
      })
  }

  addContact() {
    this.matDialog.open(AddUserComponent, {
      width: '450px',
    })
      .afterClosed().subscribe((res) => {
      if (res) {
        this.getContactList();
      }
    })
  }

  editContact(user: Users) {
    this.matDialog.open(AddUserComponent, {
      data: user,
      width: '450px',
    })
      .afterClosed().subscribe((res) => {
      if (res) {
        this.getContactList();
      }
    })
  }

  deleteContact(userId: number) {
    this.loader = true;
    this.internalApi.deleteUser(userId)
      .subscribe((res) => {
        this.getContactList();
        this.notification.success('Пользователь удален!')
      })
  }

  onTableDataChange(event: any){
    this.filterParams.page = event;
    this.getContactList();
  }

  onSearch() {
    this.getContactList();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
