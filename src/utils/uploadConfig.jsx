import React from 'react';
import { Toast } from 'antd-mobile';
import { post } from '@api/request';

const config = {
  data: 'https://api.linkto.xin/cms/api/upyun/data',
  sign: 'https://api.linkto.xin/cms/api/upyun/sign',
};

function UPYun(options) {
  var gateWay = options.gateWay;
  var fileExt = {
    image: 'jpg,jpeg,png,gif',
    video: 'avi,mp4,flv,mov,3gp,asf,wmv,m3u8,mpg,vf4v,m4v,mkv,vob',
    audio: 'mp3,silk,amr,ogg,wav,wma,m4a',
  };
  var sizeMax = {
    image: 1024 * 1024 * 3,
    video: 1024 * 1024 * 300,
    audio: 1024 * 1024 * 30,
  };
  var subject = {
    image: '图片',
    video: '视频',
    audio: '语音',
  };
  this.options = {
    gateWay: options.gateWay,
    subject: subject[gateWay],
    autoSet: options.autoSet || true,
    workSid: options.workSid,
    dataUrl: config.data + '/' + gateWay,
    signUrl: config.sign + '/' + gateWay,
    sizeMax: sizeMax[gateWay],
    fileExt: fileExt[gateWay],
    dataSet: options.dataSet,
    working: options.working,
    workEnd: options.workEnd,
  };
  var formatd = function (fe) {
    return gateWay + '/' + fe.replace(/,/gi, ',' + gateWay + '/');
  };
  this.options.fileExt = formatd(this.options.fileExt);
}

UPYun.prototype.install = async function () {
  var that = this;
  const res = await post(
    that.options.dataUrl,
    {
      sceneid: that.options.workSid,
    },
    {
      noBaseUrl: true,
      noToken: true,
    }
  );
  if (res.errcode == 0) {
    if (res.data.length) {
      that.options.sizeMax = res.data.length;
    }
    if (res.data.allows) {
      var gateWay = that.options.gateWay;
      var formatd = function (fe) {
        return gateWay + '/' + fe.replace(/,/gi, ',' + gateWay + '/');
      };
      that.options.fileExt = formatd(res.data.allows);
    }
    if (that.options.dataSet && typeof that.options.dataSet == 'function') {
      that.options.dataSet(res.data);
    }
  } else {
    if (that.options.autoSet) {
      Toast.show(that.options.subject + '上传功能启动异常');
    }
  }
  return this;
};
UPYun.prototype.upload = function (files, callback) {
  var that = this;
  console.log(files, 'upload');
  if (files && files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      if (that.options.sizeMax && file.size > that.options.sizeMax) {
        Toast.show(that.options.subject + '大小超过限制');
        return;
      }
    }
    var error_msg = function (file, i) {
      // uni.hideLoading();
      Toast.show(that.options.subject + '上传失败');
      if (that.options.working && typeof that.options.working == 'function') {
        that.options.working('error', file, i);
      }
    };
    var uploading = async function(files, callback, i, result) {
      console.log(files, 'files++=')
      i = i || 0;
      result = result || [];
      if (i < files.length) {
        var file = files[i];
        if (that.options.working && typeof that.options.working == 'function') {
          that.options.working('start', file, i);
        }
        try {
          const signResp = await post(
            that.options.signUrl,
            {
              sceneid: that.options.workSid,
            },
            {
              noBaseUrl: true,
              noToken: true,
            }
          );
          if (signResp.errcode == 0) {
            let CDN_URL = signResp.data.cdnurl;
            const formData = new FormData();
            formData.append('file', file);
            // formData.append('name', 'file');
            formData.append('policy', signResp.data.policy);
            formData.append('authorization', signResp.data.authorization);
            const uploadResp = await post(signResp.data.upload, formData, {
              noBaseUrl: true,
              noToken: true,
              headers: {}
            });
            const response = uploadResp;
            response.md5 = response.url.substring(1, response.url.lastIndexOf('.'));
            response.url = CDN_URL + response.url;
            response.sid = that.options.workSid;
            console.log(response, 'uploadresponse')
            delete response.code;
            delete response.msg;
            if (that.options.working && typeof that.options.working == 'function') {
              that.options.working('ended', file, i);
            }
            if (that.options.workEnd && typeof that.options.workEnd == 'function') {
              that.options.workEnd(response, file, i);
            }
            result.push(response.url);
            return result;
            uploading(files, callback, i + 1, result);
          }
        } catch(e) {
          error_msg(file, i);
          console.error(e, 'error')
          throw e
        }
      } else {
        // callback(result);
        console.log(result);
        return result;
      }
    };
    return uploading;
    // await uploading(files, function (result) {
    //   callback(result);
    // });
  }
};

export default {
  upyun: UPYun,
};
