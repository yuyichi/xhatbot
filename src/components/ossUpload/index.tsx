import React, { FC, useState } from 'react';
import { Toast, ImageUploader } from 'antd-mobile';
import { CloseCircleFill } from 'antd-mobile-icons';
import upload from '@util/uploadConfig';

var upyun: any = new upload.upyun({
  gateWay: 'image',
  workSid: 'WL-LARGE_SIZE-AUTO',
});
upyun.install();

// 限制上传大小
const LimitSize = props => {
  const [fileList, setFileList] = useState<any[]>([]);
  const { ossIndex, inputData } = props;

  function beforeUpload(files: File[]) {
    return files.filter(file => {
      if (file.size > 1024 * 1024 * 10) {
        Toast.show('请选择小于 10M 的图片');
        return false;
      }
      return true;
    });
  }

  async function uploadHandler(file: File) {
    try {
      const uploadFunc = upyun.upload([file], result => {
        if (result && result.length > 0) {
        }
      });
      const result1 = await uploadFunc([file], result => {
        if (result && result.length > 0) {
        }
      });
      if (result1) {
        inputData(result1[0], ossIndex)
        return {
          key: result1[0],
          url: result1[0],
        };
      } else {
        throw new Error('');
      }
    } catch (error) {
      console.error(111);
      throw error;
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <ImageUploader
        value={fileList}
        onChange={items => setFileList([items[items.length - 1]])}
        upload={uploadHandler}
        maxCount={1}
        beforeUpload={beforeUpload}
        key={props.Ukey}
        style={{
          width: '100%',
          height: '100%',
        }}
        deletable={false}
      />
      {fileList.length === 1 && <CloseCircleFill style={{ position: 'absolute', top: 0, right: 0 }} onClick={() => {
          setFileList([])
          inputData(null, ossIndex)
      }} />}
    </div>
  );
};

export default LimitSize;
