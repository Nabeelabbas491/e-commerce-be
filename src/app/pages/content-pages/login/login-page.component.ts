import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    email: new FormControl('guest@apex.com', [Validators.required]),
    password: new FormControl('Password', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private socialAuthService: SocialAuthService
  ) {
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      console.log("user", user)
    })
  }

  signInWithGoogle(): void {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      console.log("ssas", data);
    }).catch(data => {
      console.log("data..", data)
      // this.authService.signOut();
      // this.router.navigate(['login']);
    });
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  async onSubmit() {
    try {
      this.loginFormSubmitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      this.spinner.show(undefined,
        {
          type: 'ball-triangle-path',
          size: 'medium',
          bdColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fullScreen: true
        });
      delete this.loginForm.value.rememberMe
      let user = await this.authService.login(this.loginForm.value)
      this.authService.setUser(user['data'])
      this.spinner.hide()
      this.router.navigate(['/product/upload'])
    } catch (err) {
      this.isLoginFailed = true;
      this.spinner.hide()
      this.toastr.error(err.error)
      console.log("err..", err)
    }
  }

}
