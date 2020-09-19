import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';


export function emailOrPhoneValidator(control: FormControl) {
  let emailorphone = control.value;
  if (emailorphone) {
    let emailorphone_nospace = emailorphone.replace(/\s/g,"");

    if (emailorphone_nospace.indexOf("@") != -1) {
      let email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (emailorphone_nospace.match(email_regex)== null) {
        return { emailOrPhone: true }
      }
    }
    else {
      let phone_regex = /(6|7|8|9)\d{9}/;
      let phone_lastten = emailorphone_nospace.slice(-10);
      if (phone_lastten.match(phone_regex)== null) {
        return { emailOrPhone: true }
      }
    }
  }
  return null;
}


@Directive({
  selector: '[emailOrPhone]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: emailOrPhoneValidator,
      multi: true
    }
  ]
})
export class EmailOrPhoneValidator {
}
