import { Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { HistoryService } from '@app/shared/services/auth/history.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',

    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
    @ViewChild('focus') myInputField: ElementRef | undefined;

    passwordMinLength = 8;
    loginForm!: FormGroup;
    emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    formError = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private historyService: HistoryService,
    ) {
        this.authService.logout();
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
            password: [null, [Validators.required]],
        });
    }

    ngAfterViewInit() {
        this.myInputField?.nativeElement.focus();
    }

    onSubmit() {
        if (!this.loginForm.valid) {
            return;
        }

        this.authService
            .login(this.loginForm.value)
            .then(() => this.router.navigateByUrl(this.historyService.getLastNonLoginUrl()))
            .catch((message) => {
                this.formError = message;
            });
    }
}
