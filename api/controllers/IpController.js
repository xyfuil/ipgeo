var IpController = {};

IpController['getResult'] = function (req, res) {
  var ip = req.ip;
  console.log(req.headers['x-forwarded-for']);
  return res.render('ip', {
    ip: ip
  });
};

module.exports = IpController;