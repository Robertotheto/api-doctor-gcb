module.exports = [
  {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'doctor',
    migrations: ['./src/doctors/migrations/*{.ts,js}'],
    entities: ['./src/doctors/entities/*.entity{.ts,js}'],
    cli: {
      entitiesDir: './src/doctors/entities',
      migrationsDir: './src/doctors/migrations',
    },
    migrationsTableName: 'migrations_history',
    synchronize: true,
    autoLoadEntities: true,
    migrationsRun: true,
    logging: true,
  },
];
