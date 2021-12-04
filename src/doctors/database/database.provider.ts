import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseProvider = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: parseInt(process.env.MYSQL_DB_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [__dirname + './src/**/**/*.entity.{js,ts}'],
    migrations: [__dirname + './src/**/migrations/*.{js,ts}'],
    cli: {
      entitiesDir: __dirname + './src/**/entities/',
      migrationsDir: __dirname + './src/**/migrations/',
    },
    migrationsRun: true,
    autoLoadEntities: true,
  }),
];
