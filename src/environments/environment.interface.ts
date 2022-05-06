export interface EnvironmentInterface {
  production: boolean;
  envName: string;
  apiUrl?: string;

  [key: string]: unknown;
}
