var IpController = {};

var repair = function (n,v) {
  let str='';
  for(let i=0;i<(n-v.toString().length);i++){str+='0'}
  return `${str}${v}`
}
var iptoString = function (str){
  let arr=str.split(".");
  let strs="";
  for(let i=0;i<arr.length;i++){
    let pt2=parseInt(arr[i]).toString(2);
    let s=repair(8,pt2);
    strs+=s
  }
  return strs;
}
var ipToCIDR = function (ipA,ipB){
  let nn=0;
  let A=iptoString(ipA);
  let B=iptoString(ipB);
  for(let i=0;i<A.length;i++){
    if(A[i] === B[i]){
      nn++;
    }else{
      break;
    }
  }
  return `${ipA}/${nn}`;
}

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
      endIP: ipInfo.endIP,
      cidr: ipToCIDR(ipInfo.begIP, ipInfo.endIP)
    });
  });
};

module.exports = IpController;