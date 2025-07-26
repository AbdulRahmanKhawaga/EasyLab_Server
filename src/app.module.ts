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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'lis_ai_db',
      entities: [User, Patient], // ✅ Add all used entities
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PatientModule,
  ],
})
export class AppModule {}
