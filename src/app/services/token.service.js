const rs = require('jsrsasign');
const jwt = require('jsonwebtoken');

const saltKey = 'mid';

const generateToken = async (data) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const time = new Date().getTime();
  const payload = { ...data, time };
  return rs.jws.JWS.sign('HS256', header, payload, { utf8: saltKey });
}

const decodeToken = (token) => {
  return jwt.verify(token, saltKey);
}

module.exports = {
  generateToken,
  decodeToken,
};
