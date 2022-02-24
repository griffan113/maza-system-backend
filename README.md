# Maza System Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

![ci](https://github.com/griffan113/maza-system-backend/actions/workflows/jest.yml/badge.svg)

**RF**

- [ ] The user should be able to create a new order of service
- [ ] The user should be able to list all orders
- [ ] The user should be able to update an existing order
- [ ] The user should be able to delete an order
- [ ] The user should be able to filter all orders.
- [ ] The CPF or CNPJ must be valid
- [ ] The user should be able to choose if the type of person is legal or physical

**RNF**

- [ ] The list of orders should be stored in cache

**RN**

- [ ] The user cannot edit or delete an order that has not been created by him
- [ ] A saw order can only have more than one quantity if the number of teeth is the same
- [ ] After an order has been finished, it cannot be edited

# Database Tables

## Users

- id PK
- name
- email

## Clients

- id PK
- company_name
- cpf
- cnpj
- financial_contact_name
- technician_contact_name
- technician_contact_email
- financial_contact_email
- invoice_email
- orders - OneToMany = Orders

## Orders

- id PK
- order_number
- status
- client_id FK
- client - ManyToOne = Clients
- date
- total_price
- total_quantity
- saw_orders - OneToMany = Saw_Orders

## Saw_Orders

- id PK
- order_id FK
- order - ManyToOne = Orders
- price
- description
- saw_code
- quantity
- teeth_number
- teeth_value

# Routing

## Sessions Controller:

| Route/endpoint | Job                  | Method |
| -------------- | -------------------- | ------ |
| /sessions      | Create a new session | POST   |
