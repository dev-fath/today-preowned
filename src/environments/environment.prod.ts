import { EnvironmentInterface } from './environment.interface';
import base from './base';

export const environment: EnvironmentInterface = {
  ...base,
  apiUrl: 'http://localhost',
  envName: 'prod',
  production: true,
};
