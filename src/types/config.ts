export interface BCMSClientConfig {
  cmsOrigin: string;
  key: {
    id: string;
    secret: string;
  };
  enableCache?: boolean;
}
