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

export default { EmailPassSchema };
