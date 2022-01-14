import * as path from 'path';
import { createFS } from '@banez/fs';
import { createBcmsClient } from './main';
import { BCMSClientMediaResponseItem, BCMSMedia, BCMSMediaType } from './types';

async function main() {
  const fs = createFS({
    base: path.join(__dirname, 'bcms-types'),
  });
  const client = createBcmsClient({
    cmsOrigin: 'http://localhost:8080',
    key: {
      id: '61def1c5480753cc77727924',
      secret:
        '68e86ea06539b3eb154dd8f29a1aa72127de86925fdb2cb1229719e3be31d59f',
    },
  });

  const allMedia = await client.media.getAll();
  const media = allMedia.find(
    (e) => e.type !== BCMSMediaType.DIR,
  ) as BCMSClientMediaResponseItem;
  await fs.save(media.name, (await media.bin()) as Buffer);
  console.log(media);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
