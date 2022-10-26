import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

const EmailPassSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Must contain at least 8 Character')
    .minLowercase(1, 'Must contain at least 1 Lower Case')
    .minUppercase(1, 'Must contain at least 1 Upper Case')
    .minNumbers(1, 'Must contain at least 1 Number')
    .minSymbols(1, 'Must contain at least 1 Symbols')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const ResetPassSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Must contain at least 8 Character')
    .minLowercase(1, 'Must contain at least 1 Lower Case')
    .minUppercase(1, 'Must contain at least 1 Upper Case')
    .minNumbers(1, 'Must contain at least 1 Number')
    .minSymbols(1, 'Must contain at least 1 Symbols')
    .required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  email: Yup.string().email('Invalid email').required('Required'),
  code: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits'),
});

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export default { EmailPassSchema, EmailSchema, ResetPassSchema };
