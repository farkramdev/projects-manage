import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
// Validation message Dictionary
const ValidationDictionary = {
    required: 'The field is required.',
    maxlength: 'Do not enter more than {0} characters.',
    minlength: 'Do not enter less than {0} characters.',
    pattern: 'The field is invalid.',
    email: 'The field is email address.',
    password: 'The filed is password.',
    special_characters: 'The field is special charactor',
    numbers: 'The field is require number only'
};

const ValidationPatterns = {
    numbers: /^[0-9]+$/,
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,

    /* ###  charactor : false, number : true  ### */
    // password: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*-_]{8,20}$/,

    /* ###  charactor & number : true, specialcharacters: false   ### */
    // password:   /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$/,

    /* ###  characters & specialcharacters & number : true, characters & number : true , specialcharacters & characters : false  ### */

    password: /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/,
    special_characters: /^((?!([~`!#$%\^&*+=\[\]\\';,/{}|\\"":<>\?@])).)+$/,
};

// Validation Class management
class ValidationFactory {
    // check string is empty
    private static isEmpty(value: string) { return value !== undefined && (value === null || value.toString().trim() === ''); }

    // get validation messages from dictionary
    static getValidateMessage(control: FormControl): string {
        let responseMessage = '';
        for (let error in control.errors) {
            switch (error.toLowerCase()) {
                case 'maxlength':
                case 'minlength':
                    responseMessage = ValidationDictionary[error].replace('{0}', control.errors[error].requiredLength);
                    break;
                case 'message':
                    responseMessage = control.errors[error];
                    break;
                default:
                    responseMessage = ValidationDictionary[error];
                    break;
            }
        }
        return responseMessage;
    }

    // call event of validation controls
    static callValidate(form: FormGroup) {
        for (let property in form.controls) {
            let control = form.controls[property];
            control.reset(control.value);
            control.markAsTouched();
        }
    }

    // set error to control validators
    static validatorTimeout: any = {};
    static setError(control: AbstractControl, message: string, timeout: number = 2000) {
        let timeoutInit = ValidationFactory.validatorTimeout[control.value];
        control.setErrors({ message });
        control.markAsTouched();
        clearTimeout(timeoutInit);
        timeoutInit = setTimeout(() => {
            control.reset(control.value);
            control.markAsTouched();
        }, timeout);
    }

    // custom validation about pattern
    static pattern(pattern: string, errorMessage: string) {
        return (control: FormControl) => {
            if (ValidationFactory.isEmpty(control.value))
                return;
            let regex = new RegExp(pattern);
            if (regex.test(control.value))
                return;
            return { message: errorMessage };
        };
    }

    // custom validation about email
    static email(control: FormControl) {
        if (ValidationFactory.isEmpty(control.value)) return;
        if (ValidationPatterns.email.test(control.value)) return;
        return { email: '' };
    }

    // custom validation about password
    static password(control: FormControl) {
        if (ValidationFactory.isEmpty(control.value)) return;
        if (ValidationPatterns.password.test(control.value)) return;
        return { password: '' };
    }

    // custom validation about special_characters
    static specialcharacters(control: FormControl) {
        if (ValidationFactory.isEmpty(control.value)) return;
        if (!ValidationPatterns.special_characters.test(control.value)) return { special_characters: '' };
        return;
    }

    static numbers(control: FormControl) {
        if (ValidationFactory.isEmpty(control.value)) return;
        if (isNaN(control.value)) return { numbers: '' };
        return;
    }

    static optionValidate(control: FormControl) {
        if (control.value =='0') return { required:'' };
        return;
    }
}

// export validation and patterns
export const Validations = ValidationFactory;
export const Patterns = ValidationPatterns;