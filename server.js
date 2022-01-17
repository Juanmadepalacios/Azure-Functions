const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
require("dotenv").config();

const BearerStrategy = require("passport-azure-ad").BearerStrategy;

const options = {
  identityMetadata: process.env.IDENTITY_META_DATA,
  clientID: process.env.CLIENT_ID,
  audience: process.env.AUDIENCE,
  policyName: process.env.POLICY_NAME,
  isB2C: process.env.IS_B2C,
  validateIssuer: process.env.VALIDATE_ISSUER,
  loggingLevel: process.env.LOGGING_LEVEL,
  passReqToCallback: process.env.PASS_REQ_TO_CALLBACK,
  loggingNoPII: process.env.LOGGING_NO_PII,
};

const bearerStrategy = new BearerStrategy(options, (token, done) => {
  // Send user info using the second argument
  done(null, {}, token);
});

const app = express();

app.use(morgan("dev"));

app.use(passport.initialize());

passport.use(bearerStrategy);

var allowedDomains = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://localhost:3000",
  "http://test.mydna.company",
  "https://test.mydna.company",
  "https://www.mydnadigital.com",
  "https://mydnaFrontPool.azurefd.net",
  "https://mydnafront.azurewebsites.net",
  "https://mydnafront.azurewebsites.net/",
  "https://192.168.0.14:3000", //pedro
  "https://192.168.0.111:3000", // henrique
  "https://192.168.1.8:3000", //matheus
  "https://192.168.1.100:3000", //jonathan
  "https://192.168.1.128:3000", //lewis
  "https://192.168.1.176:3000", //angel
  "https://192.168.1.82:3000", //freddy
  "https://192.168.1.96:3000", // freddy trabajo
  "https://192.168.100.81:3000", //jose
  "https://smtm.co/dollar-bill",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to MyDNA application." });
});

require("./app/routes/index")(app);

const port = process.env.PORT || "5000";
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
