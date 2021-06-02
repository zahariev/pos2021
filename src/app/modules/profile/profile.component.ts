import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from '@shared/models/user';
import { AuthService } from '@app/core/auth/auth.service';
import { HistoryService } from '@app/shared/services/auth/history.service';
import { CustomValidators } from '@shared/custom-validators';
import { UserService } from '@app/shared/services/auth/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    passwordChange = false;
    passwordIsValid = false;
    userForm!: FormGroup;
    user!: { [key: string]: any };
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        public userService: UserService,
    ) {
        this.userForm = this.createUserForm();
    }
    ngOnInit(): void {
        //this.user = this.userService;

        this.userService.activeUser.subscribe((user: any) => {
            this.user = user;
            this.userForm.patchValue(this.user);
        });
    }
    createUserForm(): FormGroup {
        return this.fb.group({
            firstName: [null],
            lastName: [null],
            role: [null],
            position: [null],
            email: [null],
        });
    }

    togglePasswordChange(event: Event): void {
        this.authService.changePasswordApiCall(this.user.id);
    }
}
