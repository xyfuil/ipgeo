var IpController = {};

IpController['getResult'] = function (req, res) {
  var ss = req.ip.split(':');
  var ip = ss[ss.length-1];
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  };

  sails.qqwry.searchIPScope(ip, ip, function (err, iparr) {
    if (err) {
      return res.json(err);
    }

    var ipInfo = iparr[0];

    return res.render('ip', {
      ip: ip,
      country: ipInfo.Country,
      area: ipInfo.Area,
      begIP: ipInfo.begIP,
      endIP: ipInfo.endIP
    });
  });
};

module.exports = IpController;