import Jwt from 'jsonwebtoken';

const authVerfity = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(419).send({ error: 'Access Denied' });

  try {
    const verified = Jwt.verify(token, process.env.SECRET_JWT);
    req.user = verified;
    next();
  } catch (error) {
    res.status(419).send({ error: 'Invalid token' });
  }
};

export default authVerfity;
