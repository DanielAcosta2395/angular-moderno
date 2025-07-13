import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'register-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  formUitls = FormUtils;

  myForm = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(this.formUitls.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUitls.emailPattern)],
        [this.formUitls.checkingServerResponse],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUitls.notOnlySpacesPattern),
          this.formUitls.checkingUsername,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [
        this.formUitls.isFieldOneAndTwoEqual('password', 'confirmPassword'),
      ],
    }
  );

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }
}
