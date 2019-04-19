import DummyHelper from '../utilities/dummyHelper';

/**
 * @class DummyAuthentication
 * @description To verify user
 * @exports DummyAuthentication
 */
class DummyAuthentication {
  /**
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {object} payload
   */
  static verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = DummyHelper.verifyToken(token);
      req.userData = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Unauthorized user, bank account cant be created',
      });
    }
  }

  /**
   * @param  {object} req - The staff request object
   * @param  {object} res - The staff res response object
   * @param  {function} next - The next() Function
   * @returns {object} payload
   */

  static verifyStaff(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = DummyHelper.verifyToken(token);
      req.userData = decoded;

      if (req.userData.payload.type !== 'staff') {
        return res.status(403).send({
          status: res.statusCode,
          error: 'You are not authorized to perform this action',
        });
      }

      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentication Failed',
      });
    }
  }

  /**
   * @param  {object} req - The Admin request object
   * @param  {object} res - The Admin res response object
   * @param  {function} next - The next() Function
   * @returns {object} payload
   */
  static verifyAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = DummyHelper.verifyToken(token);
      req.userData = decoded;

      if (req.userData.payload.isAdmin === false) {
        return res.status(403).send({
          status: res.statusCode,
          error: 'You are not authorized to perform this action',
        });
      }

      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentication Failed',
      });
    }
  }
}

export default DummyAuthentication;
