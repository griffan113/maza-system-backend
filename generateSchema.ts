import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/shared/infra/graphql/graphql.ts'),
  outputAs: 'class',
  watch: true,
  enumsAsTypes: true,
});
