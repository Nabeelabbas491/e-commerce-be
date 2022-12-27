import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    // forgotPasswordForm: FormGroup;


    submitted = false;
    forgotPasswordForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
    });

    constructor(private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private authService: AuthService) { }

    get f() {
        return this.forgotPasswordForm.controls;
    }

    // On submit click, reset form fields
    async sendEmail() {
        console.log("gfeds", this.forgotPasswordForm.valid)
        try {
            this.submitted = true
            if (this.forgotPasswordForm.valid) {
                let response = await this.authService.forgotPassword(this.forgotPasswordForm.value)
                console.log("response", response)
                // this.toastr.success('ds')
            }
        } catch (e) { }
        // this.forogtPasswordForm.reset();
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
