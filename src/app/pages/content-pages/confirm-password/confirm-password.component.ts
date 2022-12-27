import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MustMatch } from 'app/shared/directives/must-match.validator';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {

  submitted = false;
  confirmPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

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

  onSubmit() {
    try {
      this.submitted = true
      if (this.confirmPasswordForm.valid) {
        delete this.confirmPasswordForm.value.confirmPassword
        console.log("form..", this.confirmPasswordForm.value)
      }
    } catch (e) { }
  }



}
