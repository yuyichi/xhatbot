import { AlscgwResult } from '@ali/kobe-pc/fetch/alscgw';
import { useRequest } from '@ali/kobe-pc/hooks';
// import { message } from 'antd';

// Q req R rep
const useOnceApi = <Q, R> (api: (param: any) => Promise<AlscgwResult<R>>) => {
  const { run, loading } = useRequest(api, {
    manual: true,
    onSuccess: () => {
      // message.success('操作成功');
    },
    onError: e => {
      // message.error(e.message || '操作失败');
    },
    throwOnError: false,
  });

  async function action(params: Q) {
    console.log(loading)
    if (loading) {
      throw null;
    };

    try {
      const data = await run(params);
      return data
    } catch (err) {
      console.error('action() Error:', err);
      throw err
    }
  }

  return { action, loading };
};

export default useOnceApi;
