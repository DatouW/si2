const moment = require("moment");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
require("dotenv").config();

const fileName = `${moment().format("YYYY_MM_DD")}.sql`;
const BACKUP_PATH = path.join(__dirname, "public", "backup", fileName);
// console.log(BACKUP_PATH);

// console.log("---------------------");
// console.log("Running Database Backup Cron Job");

// const dump = spawn(
//   "pg_dump",
//   [
//     "-U",
//     `${process.env.DB_USER}`,
//     `-p${process.env.DB_PORT}`,
//     `${process.env.DB_NAME}`,
//   ],
//   {
//     env: {
//       ...process.env,
//       PGPASSWORD: process.env.DB_PASSWORD,
//     },
//   }
// );

function backup() {
  const wstream = fs.createWriteStream(BACKUP_PATH);

  const dump = spawn(
    "pg_dump",
    [
      "-s",
      "--format=c",
      "-U",
      `${process.env.DB_USER}`,
      `-p${process.env.DB_PORT}`,
      `${process.env.DB_NAME}`,
    ],
    {
      env: {
        ...process.env,
        PGPASSWORD: process.env.DB_PASSWORD,
      },
    }
  );
  dump.stdout
    .pipe(wstream)
    .on("finish", () => {
      console.log("DB Backup Completed!");
    })
    .on("error", (err) => {
      console.error(err);
    });
  // dump.stderr.on("data", (data) => {
  //   console.error(`stderr: ${data}`);
  // });

  // dump.on("close", (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });

  // dump.stdout.on("data", (data) => {
  //   console.log("----", data);
  // });
}

function restore() {
  console.log("restore...");
  const restoreCommand = spawn(
    "pg_restore",
    [
      // "-c",
      "-C",
      // "--format=c",
      "-U",
      process.env.DB_USER,
      "-d",
      process.env.DB_NAME,
      // "-f",
      BACKUP_PATH,
    ],
    {
      env: {
        ...process.env,
        PGPASSWORD: process.env.DB_PASSWORD,
      },
    }
  );
  console.log(BACKUP_PATH);
  const fileContent = fs.readFileSync(BACKUP_PATH);
  if (fileContent.length === 0) return;

  // console.log(restoreCommand.stdin);
  // Maneja eventos de salida, error y finalización del proceso hijo
  restoreCommand.stdout.on("data", (data) => {
    console.log(`Salida: ${data}`);
  });

  restoreCommand.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  restoreCommand.on("close", (code) => {
    if (code === 0) {
      console.log("Restauración de la base de datos completada con éxito");
    } else {
      console.error(
        `Error al restaurar la base de datos. Código de salida: ${code}`
      );
    }
  });
  console.log("fin restore...");
}

module.exports = {
  backup,
  restore,
};
