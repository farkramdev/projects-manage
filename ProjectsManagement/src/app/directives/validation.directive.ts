import { Directive, Input, DoCheck, ElementRef, Renderer } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
@Directive({
    selector: 'validation'
})
export class ValidationDirective implements DoCheck {
    constructor(private element: ElementRef, private render: Renderer) { }

    @Input() control: FormControl;

    // Check realtime data : ตรวจสอบข้อมูลทุก Event
    ngDoCheck() {
        if (!this.control) return;
        let nativeElement: HTMLElement = this.element.nativeElement;
        let invaldClass = 'ng-invalid';
        if (this.control.dirty) {
            if (this.control.valid) {
                nativeElement.innerText = '';
                this.render.setElementClass(nativeElement, invaldClass, false);
            }
            else {
                const errorMessage = this.getValidatorsMessage();
                nativeElement.innerText = errorMessage;
                this.render.setElementClass(nativeElement, invaldClass, true);
            }
        }
    }

    // Check type and get validator message : ตรวจสอบว่าเป็น error ชนิดไหนและแสดงข้อความนั้นออกมา
    protected getValidatorsMessage() {
        let errors = this.control.errors;
        let msg = '';
        for (let i in errors) {
            let error = errors[i];
            switch (i) {
                case 'minlength':
                case 'maxlength':
                    msg = ValidatorsMessage[i].replace('{0}', error.requiredLength);
                    break;
                case 'pattern':
                    msg = ValidatorsMessage[i];
                    break;
                case 'message':
                    msg = error;
                    break;
                default:
                    msg = ValidatorsMessage[i];
                    break;
            }
        }
        return msg;
    }
}

// list of message : รายการข้อความ error
const ValidatorsMessage = {
    required: 'The field is required.',
    pattern: 'The field is invalid.',
    maxlength: 'Don\'t fill more than {0} characters.',
    minlength: 'Don\'t fill less than {0} characters.',
    numeric: 'The field is number.',
    password: 'The field is password.',
    email: 'The field is email.',
    compare_password: 'Password and Confirm password do not match.',
    phone: 'The field is phone number.'
};