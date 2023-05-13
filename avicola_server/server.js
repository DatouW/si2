const express = require("express");
const cors = require("cors");
const sequelize = require("./database/index");
const app = express();
const { config } = require("./config");
const { expressjwt: expressJWT } = require("express-jwt");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);
app.use(cors());

app.use("/api", require("./routes/login"));
app.use("/prod/aves", require("./routes/prodAve"));
app.use("/galpon", require("./routes/galpon.js"));

//Error-handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") res.status(401).send("token invalido");
  //unknown error
  else res.send({ status: 1, msg: "unknown error" });
  console.log(err);
});

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
