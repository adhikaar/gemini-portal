import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';


export function emailValidator(control: FormControl) {
  let validemail = control.value;
  if (validemail) {
    let validemail_nospace = validemail.replace(/\s/g,"");

    let email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if ((validemail_nospace.indexOf("@") != -1) && (validemail_nospace.match(email_regex) == null)) {
      return { validemail: true }
    }
  }
  return null;
}


@Directive({
  selector: '[validemail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: emailValidator,
      multi: true
    }
  ]
})
export class EmailValidator {
}
