import { Client, PersonType } from '.prisma/client';

export class FakeClient implements Client {
  id: string;
  cnpj: string;
  person_type: PersonType;
  company_name: string;
  cpf: string;
  financial_contact_email: string;
  financial_contact_name: string;
  invoice_email: string;
  technician_contact_email: string;
  technician_contact_name: string;
  created_at: Date;
  updated_at: Date;
}
