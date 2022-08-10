# Maza's Packing System Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

```
docker build -t maza-packing-system-backend .

docker run -p 3333:3333 --name maza-backend -d maza-backend

docker exec -it maza-backend /bin/sh
```

![ci](https://github.com/griffan113/maza-system-backend/actions/workflows/jest_development.yml/badge.svg)
[![codecov](https://codecov.io/gh/griffan113/maza-system-backend/branch/master/graph/badge.svg?token=5AYT7LNEIF)](https://codecov.io/gh/griffan113/maza-system-backend)

**RF**

- [ ] The user should be able to create a new order of service
- [ ] The user should be able to list all orders
- [ ] The user should be able to update an existing order
- [ ] The user should be able to delete an order
- [ ] The user should be able to filter all orders.
- [ ] The user should be able to paginate all orders.
- [x] The user should be able to create a new product
- [x] The user should be able to list all products
- [x] The user should be able to update an existing product
- [x] The user should be able to delete a product
- [x] The user should be able to filter all products.
- [x] The user should be able to paginate all products.
- [x] The admin should be able to create a new user
- [x] All users should be able to read all users
- [x] The admin should be able to update an existing client
- [x] The admin should be able to delete a client
- [x] All users should be able to filter all clients.
- [x] All users should be able to paginate all clients.
- [x] The admin and the editor should be able to create a new client
- [x] All users should be able to list all clients
- [x] The admin and the editor should be able to update an existing client
- [x] The admin and the editor should be able to delete an client
- [x] All users should be able to filter all clients.
- [x] All users should be able to paginate all clients.
- [x] The client CNPJ must be valid
- [x] The client CNPJ must be parsed
- [x] The client CEP must be valid

**RNF**

- [ ] Only the logic-centered services may have tests
- [ ] All the application importations must be in TypeScript paths
