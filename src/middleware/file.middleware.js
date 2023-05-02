const multer = require("@koa/multer");
const { IS_NOT_SINGLE_FILE } = require("../config/errorConstant");
const { UPLOAD_PATH } = require("../config/pathConstant");

// 上传头像的中间件(单文件上传没有后缀名)
// const uploadAvatar = multer({
//   dest: UPLOAD_PATH,
// });
// 自定义定义文件上传中间件
const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, UPLOAD_PATH);
    },
    filename(req, file, cb) {
      const fileArr = file.originalname.split(".");
      let type = fileArr[fileArr.length - 1];
      cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
    },
  }),
  limits: {
    //上传文件的限制
    fields: 10,
    fileSize: 1024 * 1024 * 8,
    files: 1,
  },
});

const handleAvatar = uploadAvatar.single("avatar");
module.exports = {
  handleAvatar,
};
