<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Orders

**RF**

- The user should be able to create a new order of service
- The user should be able to list all orders
- The user should be able to update an existing order
- The user should be able to delete an order
- The user should be able to filter all orders with CPF/CNPJ, name

**RNF**

- The list of orders should be stored in cache

**RN**

- The user cannot edit or delete an order that has not been created by him
- A saw order can only have more than one quantity if the number of teeth is the same
- After an order has been finished, it cannot be edited

# Database Tables

## Users

- id
- name
- email
- role

## Clients

- id
- company_name
- cpf
- cnpj
- financial_contact
- technician_contact
- technician_contact_email
- financial_contact_email
- invoice_email
- orders - OneToMany = Orders

## Orders

- id
- number
- status
- client_id
- client - ManyToOne = Clients
- date
- total_price
- total_quantity
- saw_orders - OneToMany = Saw_Orders

## Saw_Orders

- id
- order_id
- order - ManyToOne = Orders
- price
- description
- saw_code
- quantity
- teeth_number
- teeth_value

<!-- # Routing

## Clients Controller:

| Route/endpoint  | Job                         | Method |
| --------------- | --------------------------- | ------ |
| /clients        | Create a new client account | POST   |
| /clients/avatar | Update user's avatar        | PATCH  |

## Orders Controller:

| Route/endpoint | Job                  | Method |
| -------------- | -------------------- | ------ |
| /orders        | Create new order     | POST   |
| /orders/reset  | Change user password | POST   | -->
