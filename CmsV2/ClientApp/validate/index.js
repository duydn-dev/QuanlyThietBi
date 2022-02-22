import { Validator } from 'vee-validate';

const dict = {
    en: {
        messages: {
            email: () => 'email rỗng'
        }
    },
    vi: {
        messages: {
            email: () => 'email rỗng'
        }
    }
};

Validator.localize(dict);
// or use the instance method