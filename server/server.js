const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./server/db.json');
const userdb = JSON.parse(fs.readFileSync('./server/users.json', 'UTF-8'));

const SECRET_KEY = 'VerySecretKeyHere';
const expiresIn = '2h';

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

// Creates a token from the payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verifies the provided token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

// Processes login requests
server.post('/auth/login', (req, res) => {
  const data = req.body;
  const { username, password } = req.body;

  if (!data.username || !data.password) {
    console.log("Authentication failed - username or password not provided");
    return res.status(401).send('username or password not provided');
  }

  let user = userdb.users.find(user => user.username === username);

  if (!user) {
    console.log("Authentication failed - user does not exist");
    return res.status(401).send('User does not exist');
  }

  if(user.password !== data.password) {
    console.log("Authentication failed - invalid credentials");
    return res.status(401).send('Invalid credentials');
  }

  if(!user.active) {
    console.log("Authentication failed - user is not active");
    return res.status(401).send('User account is not active');
  }

  const access_token = createToken({ username, password });

  res.status(200).send({ authenticated: true, accessToken: access_token, user: user });
})

// Process all other requests and enforce JWT
server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Error: invalid authorization format';
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error: access token is revoked';
    res.status(status).json({ status, message });
  }
});

server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))

server.use(router);

server.listen(8000, () => {
  console.log('Auth API Server is running on http://localhost:8000');
});
