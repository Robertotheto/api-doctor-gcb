import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseConnections = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: parseInt(process.env.MYSQL_DB_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }),
];
