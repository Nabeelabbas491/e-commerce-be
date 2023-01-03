import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { AuthService } from 'app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {

  submitted = false;
  confirmPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    let user_id = null
    this.route.queryParams.subscribe((response) => {
      user_id = response.id
    })

    this.confirmPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      id: user_id
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.confirmPasswordForm.controls;
  }

  async onSubmit() {
    try {
      this.submitted = true
      if (this.confirmPasswordForm.valid) {
        delete this.confirmPasswordForm.value.confirmPassword
        let response: any = await this.authService.resetPassword(this.confirmPasswordForm.value)
        if (response.status == 'sucesss') {
          this.router.navigate(['/pages/login'])
          this.toastr.success(response.message)
        }
      }
    } catch (e) { }
  }



}
