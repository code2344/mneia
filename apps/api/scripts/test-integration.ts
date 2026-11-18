import { PostgresInstance } from "pg-embedded";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const apiDirectory = path.resolve(scriptDirectory, "..");

type RunOptions = {
  environment?: Record<string, string>;
  quiet?: boolean;
};

function run(
  command: string,
  args: string[],
  options: RunOptions = {},
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: apiDirectory,
      env: {
        ...process.env,
        ...options.environment,
      },
      stdio: options.quiet
        ? ["ignore", "pipe", "pipe"]
        : "inherit",
    });

    child.on("error", reject);

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}

const postgres = new PostgresInstance({
  port: 55432,
  username: "postgres",
  password: "postgres",
  persistent: false,
});

try {
  process.env.DYLD_LIBRARY_PATH = [
    "/Users/ruben_sutton29/.brew/opt/openssl@3/lib",
    process.env.DYLD_LIBRARY_PATH,
  ]
    .filter(Boolean)
    .join(":");
  await postgres.start();
  await postgres.createDatabase("mneia_test");

  const databaseUrl = postgres.connectionInfo.connectionString;

  await run("npx", ["prisma", "db", "push"], {
    environment: {
      DATABASE_URL: databaseUrl,
    },
    quiet: true,
  });

  await run("npx", ["vitest", "run", "--config", "vitest.integration.config.ts"], {
    environment: {
      DATABASE_URL: databaseUrl,
    },
  });
} finally {
  try {
    if (postgres.isHealthy()) {
      await postgres.stop();
    }
  } catch (error) {
    console.error("Could not clean up embedded PostgreSQL:", error);
  }
}