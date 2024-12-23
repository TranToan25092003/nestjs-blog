import { faker } from '@faker-js/faker';

/**
 * fake data
 */

export const completeUser = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: 'zxcvbnm2K3@',
};

export const missingFirstName = {
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: 'zxcvbnm2K3@',
};

export const missingEmail = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: 'zxcvbnm2K3@',
};

export const missingPassword = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
};
