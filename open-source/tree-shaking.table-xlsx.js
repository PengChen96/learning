import {exportFile} from "table-xlsx"; // table-xlsx还未支持esm

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
    exportFile({
      columns,
      dataSource
    })
  }
  return onExportClick;
}
