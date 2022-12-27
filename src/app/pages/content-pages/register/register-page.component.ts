import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  registerFormSubmitted = false;
  registerForm: FormGroup;
  emailExist = false
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private socailAuthService: SocialAuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    // this.variables_input.nativeElement.setAttribute('class', 'form-control')
    // setTimeout(() => {
    //   document.getElementById('email').setAttribute("class", "is-invalid")
    // })
  }

  get rf() {
    return this.registerForm.controls;
  }


  //  On submit click, reset field value
  async onSubmit() {
    try {
      this.registerFormSubmitted = true;
      if (this.registerForm.invalid) return;
      delete this.registerForm.value.confirmPassword, delete this.registerForm.value.acceptTerms
      let user = await this.authService.register(this.registerForm.value)
      this.emailExist = false
      this.authService.setUser(user)
      this.router.navigate(['/product/upload']);
    } catch (e) {
      console.log("error,", e.error)
      if (e.error == 'Email already exist') {
        // document.getElementById('email').setAttribute('style', 'border-color:  #F55252 !important;box-shadow: 0 0 0 0.2rem rgb(245 82 82 / 25%); !important');
        this.toastr.error(e.error)
      }
    }
  }
}
