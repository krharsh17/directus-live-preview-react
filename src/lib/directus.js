import { createDirectus, rest, realtime } from '@directus/sdk';

const BACKEND_URL = "http://localhost:8055/"

const client = createDirectus(BACKEND_URL)
  .with(rest({credentials: 'include'}))
  .with(
    realtime({
      authMode: 'public',
    }),
  );

export default client;