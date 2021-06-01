import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    resetForm!: FormGroup;
    usernameMinLength = 3;
    emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    public noTouchError = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private authService: AuthService, // public translate: TranslateService,
    ) {}

    ngOnInit() {
        this.resetForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
        });
    }
    openSnackBar(message: string, action: string = 'X') {
        this.snackBar.open(message, action, {
            duration: 5000,
        });
    }
    onSubmit() {
        this.noTouchError = '';
        if (!this.resetForm.valid && !this.resetForm.touched) {
            this.noTouchError = 'All fields are required, please try again';
            return;
        } else {
            this.authService.resetPasswordApiCall(this.resetForm.value).subscribe({
                next: () => {
                    this.router.navigateByUrl('login');
                    this.openSnackBar('An Email with a link for password change was sent to you');
                },
                error: (message) => {
                    if (message === 'Internal Server Error')
                        this.noTouchError = 'COMMON.SVR_ERR.CREDENTIALS_ERROR';
                    else this.noTouchError = 'COMMON.SVR_ERR.GENERAL_ERROR';
                },
            });
        }
    }
}
