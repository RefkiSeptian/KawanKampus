import { spawn } from 'node:child_process';

// Keep production test artifacts and the HTTP listener separate from an active dev preview.
const env = { ...process.env, NEXT_BUILD_DIR: '.next-e2e' };
let child;
let stopped = false;
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    stopped = true;
    child?.kill(signal);
  });
}
function next(args) {
  return new Promise((resolve, reject) => {
    child = spawn(process.execPath, ['node_modules/next/dist/bin/next', ...args], {
      env,
      stdio: 'inherit',
      windowsHide: true,
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 || stopped ? resolve() : reject(new Error(`Next.js exited with ${code}`)),
    );
  });
}
await next(['build']);
if (!stopped) await next(['start', '--hostname', '127.0.0.1', '--port', '3100']);
