import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../model/member';
import { Gender } from '../../enums/gender';
import { ColumnSchema } from '../../interfaces/column-schema';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  showFormUser: boolean;
  memberToCreate: Member;
  userForm: FormGroup;
  memberList: Member[];
  columnsSchema: ColumnSchema[];
  displayedColumns: string[];
  genderValues: string[];

  constructor() {
    this.showFormUser = false;
    this.memberToCreate = Member.newEmptyMember();
    this.genderValues = Object.values(Gender);
    this.columnsSchema = [
      { key: 'memberNumber', type: 'number', label: 'Socio' },
      { key: 'name', type: 'text', label: 'Nombre' },
      { key: 'lastName', type: 'text', label: 'Apellidos' },
      { key: 'legalId', type: 'text', label: 'DNI' },
      { key: 'telephone', type: 'text', label: 'Teléfono' },
      { key: 'gender', type: 'gender', label: 'Género' },
      { key: 'isEdit', type: 'isEdit', label: '' },
    ];
    this.displayedColumns = this.columnsSchema.map((column) => column.key);
    this.memberList = [];
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      memberNumber: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(129),
      ]),
      legalId: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      telephone: new FormControl('', []),
      gender: new FormControl('', []),
    });
  }

  ngOnInit(): void {}

  showUserForm() {
    this.showFormUser = true;
  }

  saveContact() {
    if (this.userForm.invalid) {
      return;
    }
    const existingMemberNumbers = this.memberList.map(
      (member) => member.memberNumber
    );
    if (existingMemberNumbers.includes(this.memberToCreate.memberNumber)) {
      alert('El número de socio ya existe, por favor seleccione otro.');
      return;
    }
    this.memberList = [...this.memberList, { ...this.memberToCreate }];
    this.showFormUser = false;
    this.memberToCreate = Member.newEmptyMember();
  }

  cancelAddNewMember() {
    this.memberToCreate = Member.newEmptyMember();
    this.showFormUser = false;
  }

  deleteMember(memberToDelete: Member) {
    this.memberList = this.memberList.filter(
      (member) => member !== memberToDelete
    );
  }
}
