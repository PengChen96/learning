import React from 'react';
import {exportFile} from "table-xlsx";

export default () => {
  const dataSource = [
    {key: '1', name: '胡彦斌23', age: 32, address: '西湖区湖底公园1号',},
    {key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号',},
  ];

  const columns = [
    {title: '姓名', dataIndex: 'name', key: 'name',},
    {title: '年龄', dataIndex: 'age', key: 'age',},
    {title: '住址', dataIndex: 'address', key: 'address',},
  ];
  const onExportClick = () => {
    // 测试webpack打包结果
    // import('../webpack/entry/eg.entry').then(res => {
    //   res.sumFun(1,2);
    // });
    // import('../webpack/entry/eg.basic.entry').then(res => {
    //   res.test();
    // })
    exportFile({
      columns,
      dataSource
    })
  }
  return <div onClick={onExportClick}>
    导出
  </div>;
}
