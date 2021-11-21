import * as yup from 'yup';

export const doctorSchema = yup.object().shape({
  name: yup
    .string()
    .required('The name field is required')
    .max(120, 'Must contain a maximum of 120 characters'),
  crm: yup
    .number()
    .required('The crm field is required')
    .test(
      'crm',
      'Must be exactly 7 characters is required',
      (val) => val.toString().length === 7,
    ),
  landline: yup.number().required('The landline required field'),
  cellphone: yup.number().required('The required cell phone field'),
  cep: yup
    .number()
    .required('The cep field is required')
    .test(
      'cep',
      'Must be exactly 8 characters is required',
      (val) => val.toString().length === 8,
    ),
  medicalspecialties: yup
    .array(yup.string().required())
    .required()
    .min(2, 'Must have at least two medical specialties'),
});
