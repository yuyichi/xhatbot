/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment from 'moment';
import { setSearchFormValue, getSearchFormValue } from './user';
const queryString = require('query-string');

export const debounce = (fn: (...args: any) => any, debTime: number): () => void => {
  let timer: any = null;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, debTime);
  };
};


export const downloadUrl = (url: string) => {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export const formDate = (date: string) => {
  let retureDate = '--';
  if (date) {
    retureDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
  }
  return retureDate;
};

// 表单校验规则：禁止填写空格
export const NoSpaceRule = {
  validator: (_, value) => {
    if (value && !/^[^\s]*$/.test(value)) {
      return Promise.reject(new Error('禁止输入空格'));
    }
    return Promise.resolve();
  },
};

// 表单校验规则：允许输入字符
export const AllowedCharRule = {
  validator: (_, value) => {
    if (value && !/^[0-9a-zA-Z_]+$/.test(value)) {
      return Promise.reject(new Error('仅允许数字、字母或下划线'));
    }
    return Promise.resolve();
  },
};

// export function queryString(searchString: string) {
//   const searchs = searchString.substr(1, searchString.length - 1).split('&');
//     const searchObj = {};
//     for(const i of searchs) {           // 遍历数组
//       const arr = i.split('='); 
//       searchObj[arr[0]] = arr[1]; 
//     }
//     return searchObj
// }

// 日期组件数据转换，适用于antd的Datepicker组件
export function getTimeFromDatepicker(datepickerValue) {
  if (datepickerValue && datepickerValue.length) {
    console.log(datepickerValue[0], datepickerValue[1]);

    return [
      moment(datepickerValue[0]).format('x'),
      moment(datepickerValue[1]).format('x'),
    ];
  }
  return [];
}

export function getPageAndSize() {
    const returnObj = {
      current: 1, pageSize: 10
    }
    
  const formCatche = getSearchFormValue('formCache');
    if (formCatche && formCatche[location.pathname]) {
      const obj = formCatche[location.pathname];
      if (obj.current) {
        returnObj.current = Number(obj.current) 
      }
      if (obj.pageSize) {
        returnObj.pageSize = Number(obj.pageSize) 
      }
    }
  return returnObj
}


// 从URL的queryString中获取列表参数
export function getFormDataFromQueryString(config: any = {}, isPage = false) {
  const obj = queryString.parse(location.search);
  config.datePickerFields && config.datePickerFields.map(item => {
    if (obj[item]) {
      obj[item][0] = obj[item][0] ? moment(parseInt(obj[item][0])) : obj[item][0];
      obj[item][1] = obj[item][1] ? moment(parseInt(obj[item][1])) : obj[item][1];
    }
  });

  config.numberFields && config.numberFields.map(item => {
    if (obj[item]) {
      try {
        obj[item] = parseInt(obj[item]);
      } catch (err) {
        console.error('number转换失败 Error:', err);
      }
    }
  });
  return obj;
}

// 从URL的queryString中获取列表参数
export function getQueryStringByFormData(config: any = {}) {
  const formData = config.formData || {};

  if (formData) {
    config.datePickerFields && config.datePickerFields.map(item => {
      if (formData[item] && formData[item].length) {
        formData[item] = getTimeFromDatepicker(formData[item]);
      }
    });
  }

  return queryString.stringify(formData);
}

export function searchFormCachWrapper(params, formData, func) {
  console.log(params);
  setSearchFormValue({
    ...formData,
    pageSize: params?.pageSize,
    current: params?.current,
  })
  return func(params, formData)
}