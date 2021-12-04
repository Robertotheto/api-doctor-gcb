import {v4 as uuid} from 'uuid';

const cep = 78550434
const medicalspecialties: string[] = [];
medicalspecialties.push(
  'Alergologia',
  'Angiologia',
  'Buco maxilo',
  'Cardiologia clínca',
  'Cardiologia infantil',
  'Cirurgia cabeça e pescoço',
  'Cirurgia cardíaca',
  'Cirurgia de tórax',
)
export const SeedDoctor = [{
  id: uuid(),
  name: "Ben Carson",
  crm: 8596742,
  landline: 66999556011,
  cellphone: 66999556022,
  CEP: cep,
  medicalspecialties: medicalspecialties,
}]