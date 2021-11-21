import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseConnections = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: parseInt(process.env.MYSQL_DB_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATIONS],
    cli: {
      entitiesDir: process.env.ENTITIES,
      migrationsDir: process.env.MIGRATIONS,
    },
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }),
];