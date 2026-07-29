// PM2 process definition for OpenWA.
// Run from the project root:  pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'openwa',
      script: 'dist/main.js',
      // Run from the repo root so the app's relative paths (./data/*, .env)
      // resolve correctly regardless of where `pm2 start` is invoked.
      cwd: __dirname,

      // IMPORTANT: single fork instance only. WhatsApp sessions are stateful and
      // each drives its own Chromium; cluster mode would spawn duplicates that
      // fight over the SQLite file and the session folders.
      instances: 1,
      exec_mode: 'fork',

      autorestart: true,
      watch: false,
      // Do NOT set an aggressive memory cap: Chromium legitimately uses a few
      // hundred MB per session, and a restart drops live connections. Uncomment
      // and tune only if you know the box's limits.
      // max_memory_restart: '2G',

      env: {
        NODE_ENV: 'production',
      },

      // Timestamped logs; view with `pm2 logs openwa`.
      time: true,
    },
  ],
};
