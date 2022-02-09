import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Users} from "../../Interfaces/users";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InternalApiService} from "../../Services/internal-api.service";
import {NotificationService} from "../../Services/notification.service";
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public user: Users;
  public loader = false;
  public form: FormGroup;

  constructor(private matDialogRef: MatDialogRef<AddUserComponent>,
              private fb: FormBuilder,
              private internalApi: InternalApiService,
              private notification: NotificationService,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.user = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.user ? this.user.name : '', Validators.required],
      email: [this.user ? this.user.email : '', Validators.required],
      password: ['', Validators.required],
    });
  }

  save() {
    if (this.user) {
      this.update();
    } else {
      this.add();
    }
  }

  add() {
    if (this.form.invalid) {
      return this.notification.error('Форма некорректно заполнено!');
    }
    this.loader = true;
    const body = cloneDeep(this.form.value);
    this.internalApi.addUser(body)
      .subscribe((res) => {
        if (res) {
          this.loader = false;
          this.matDialogRef.close(true);
        }
      })
  }

  update() {
    if (this.form.invalid) {
      return this.notification.error('Форма некорректно заполнено!');
    }
    this.loader = true;
    const body = cloneDeep(this.form.value);

    this.internalApi.updateUser(this.user.id, body)
      .subscribe(() => {
        this.loader = false;
        this.matDialogRef.close(true);
      })
  }

  close() {
    this.matDialogRef.close();
  }

}
