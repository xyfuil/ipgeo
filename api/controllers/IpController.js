var IpController = {};

IpController['getResult'] = function (req, res) {
  var ip = req.ip;
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  };
  return res.render('ip', {
    ip: ip
  });
};

module.exports = IpController;