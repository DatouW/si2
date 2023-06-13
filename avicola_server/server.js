const express = require("express");
const cors = require("cors");
const sequelize = require("./database/index");
const app = express();
// const { config } = require("./config");
// const { expressjwt: expressJWT } = require("express-jwt");
const { backup, restore } = require("./backup");

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(
//   expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
//     path: [/^\/api\//],
//   })
// );
app.use(cors());

app.use("/api", require("./routes/login"));
app.use("/prod/aves", require("./routes/prodAve"));
app.use("/galpon", require("./routes/galpon.js"));
app.use("/user", require("./routes/usuario"));
app.use("/role", require("./routes/rol"));
app.use("/poultry", require("./routes/ave"));
app.use("/weather", require("./routes/ambiente"));
app.use("/health", require("./routes/salud"));
app.use("/quar", require("./routes/cuarentena"));
app.use("/report", require("./routes/reporte"));

//Error-handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") res.status(401).send("token invalido");
  //unknown error
  else res.send({ status: 1, msg: "unknown error" });
  console.log(err);
});

// backup();
restore();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
