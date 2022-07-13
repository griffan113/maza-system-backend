import { PrismaClient, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Administrador',
    email: 'mazaafiacao@gmail.com',
    password: '',
    role: 'ADMIN',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const user of userData) {
    const password = await hash('123', 8);
    const createUser = await prisma.user.create({
      data: { ...user, password },
    });

    console.log(`Created user with id: ${createUser.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
