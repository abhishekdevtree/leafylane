// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
