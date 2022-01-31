import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const isCustomAuth = token.length < 500; // check is token is our own or google's

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test_secret');
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; // sub is google's name for specific id
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
