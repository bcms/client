import { createBcmsClient } from './main';

async function main() {
  const client = createBcmsClient({
    cmsOrigin: 'http://localhost:8080',
    key: {
      id: '61def1c5480753cc77727924',
      secret:
        '68e86ea06539b3eb154dd8f29a1aa72127de86925fdb2cb1229719e3be31d59f',
    },
  });
  console.log(await client.function.call('test'));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
