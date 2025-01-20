var IpController = {};

IpController['getResult'] = function (req, res) {
  var ip = req.ip;
  return res.render('ip', {
    ip: ip
  });
};

module.exports = IpController;