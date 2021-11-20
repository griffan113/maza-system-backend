import { Client } from '.prisma/client';

export class FakeClient implements Client {
  id: string;
  cnpj: string;
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
