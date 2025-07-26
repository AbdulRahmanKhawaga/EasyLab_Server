import { DataSource } from 'typeorm';
import { Patient } from '../patient/entities/patient.entity';
import { faker } from '@faker-js/faker'; // ✅ Correct import for new Faker

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'abdo',
  password: '10102002',
  database: 'lis_ai_db',
  entities: [Patient],
  synchronize: false,
});

async function seedPatients() {
  await AppDataSource.initialize();
  const patientRepo = AppDataSource.getRepository(Patient);

  for (let i = 0; i < 20; i++) {
    const patient = patientRepo.create({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      date_of_birth: faker.date.past({ years: 60, refDate: new Date('2005-01-01') }), // ✅ fixed
      gender: faker.helpers.arrayElement(['Male', 'Female']), // ✅ fixed
      phone: faker.phone.number(), // ✅ fixed
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      national_id: faker.string.uuid(), // ✅ fixed
    });

    await patientRepo.save(patient);
  }

  console.log('✅ Patients seeded');
  process.exit(0);
}

seedPatients().catch((err) => {
  console.error(err);
  process.exit(1);
});
