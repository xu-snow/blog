const
  fs = require('fs'),
  path = require('path'),
  formidable = require('formidable')
  folder = path.resolve(__dirname, '../public/upload/img/')



let uploadImage = {}

uploadImage.post = (req, res) => {
  var form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = 'utf-8'; //设置编辑
  form.uploadDir = folder //设置上传目录
  form.keepExtensions = true; //保留后缀
  // form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.end(JSON.stringify({
        msg: 'saveImg error',
        code: 1
      }))
    }
    var extName = ''; //后缀名
    // switch (files.img.type) {
    //   case 'image/pjpeg':
    //     extName = 'jpg';
    //     break;
    //   case 'image/jpeg':
    //     extName = 'jpg';
    //     break;
    //   case 'image/png':
    //     extName = 'png';
    //     break;
    //   case 'image/x-png':
    //     extName = 'png';
    //     break;
    // }

    extName = files.img.type.split('/')[1]
    // if (extName.length == 0) {
    //   res.end(JSON.stringify({
    //     type: '只支持png和jpg格式图片'
    //   }))
    // }

    var imgName = Math.random() + '.' + extName;
    //图片写入地址；
    var newPath = path.resolve(folder, imgName);
    //显示地址；
    // var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;

    // 将临时文件保存为正式的文件
    fs.rename(files.img.path, newPath, function (err) {
      // 存储结果
      var result = '';
      var imgUrl = '';

      if (err) {
        // 发生错误
        console.log('fs.rename err');
        res.end(JSON.stringify({
          msg: 'saveImg error',
          code: 1
        }))
      } else {
        // 保存成功
        console.log('fs.rename done');
        res.end(JSON.stringify({
          code: 0,
          name:`/upload/img/${imgName}`
        }))
      }
    });
    // fs.renameSync(files.img.path, newPath); //重命名
  });

}

module.exports = uploadImage