const ENVIRONMENT = getEnvironment();
const MONGODB_ENDPOINT = process.env.MONGODB_ENDPOINT;
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || "dev-only-secret";
const APP_URL = process.env.APP_URL || "http://10.149.108.120:8081/"; 

module.exports = {
  PORT,
  MONGODB_ENDPOINT,
  SECRET,
  ENVIRONMENT,
};

function getEnvironment() {
  return process.env.ENVIRONMENT || "development";
}
