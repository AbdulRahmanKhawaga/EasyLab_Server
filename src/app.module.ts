import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Patient } from './patient/entities/patient.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'lis_ai_db',
      entities: [User, Patient], // ✅ Add all used entities
      synchronize: process.env.NODE_ENV !== 'production', // Only sync in development
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    UserModule,
    AuthModule,
    PatientModule,
  ],
})
export class AppModule {}
