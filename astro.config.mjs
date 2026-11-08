import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.gthink.com.gh', // TODO: replace with the confirmed domain
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
