export const environment = {
  production: true,
  appName: 'leafy-lane-web',
  baseURL: {
    local: 'http://localhost',
    dev: 'https://lfln.dtsdev.xyz',
    prod: 'https://lfln.dtsdev.xyz',
  } as { [key: string]: string },
  frontendPort: {
    local: ':4200',
    dev: '',
    prod: '',
  } as { [key: string]: string },
  backendPort: {
    local: ':3051',
    dev: ':3000',
    prod: ':3000',
  } as { [key: string]: string },
  apiEnv: 'dev',

  aws: {
    CognitoIdentity: {
      region: 'ap-south-1'
    },
    s3Bucket: {
      name: 'dev.dts',
      region:'ap-south-1',
    },
    cloudfront: {
      domainName : 'https://cdn.dtsdev.xyz/',
    },
  },
};
