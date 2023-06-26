import knex from 'knex';
import { clinic } from '../../knexfile.js';

const clinicDB = knex(clinic);

export default clinicDB;
