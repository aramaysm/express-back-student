import { DataSource } from "typeorm";

// ormconfig.js
import { config } from 'dotenv';
import { Student } from "./entities/student.entity";
import { Grade } from "./entities/grade.entity";

export const myDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'students-app',
  port: 3306,  
  synchronize: false,
  entities: process.env.NODE_ENV !== 'production' ? [Student, Grade] : ['dist/**/*.entity.js'],
  migrations: process.env.NODE_ENV !== 'production' ? ['src/migrations/*.ts'] : ['dist/migrations/*.js'],
  
});