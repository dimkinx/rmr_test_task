import {FC, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {Table, Button, Input, Space, InputRef} from 'antd';
import type {ColumnsType, ColumnType} from 'antd/es/table';
import {SearchOutlined} from '@ant-design/icons';
import type {FilterConfirmProps} from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import {fetchUsers} from '../../store/users/users-api-actions';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {getTableData} from '../../store/users/users-selectors';
import {TableData} from '../../types/table';
import {compareDuration, createDaysList, getFormattedDate} from '../../helpers/date-time-utils';
import {CURRENT_MONTH_OF_YEAR, FILTER_TIMEOUT} from '../../common/constants';

type DataIndex = keyof TableData;

const Main: FC = () => {
  const data = useSelector(getTableData);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: Array<string>,
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<TableData> => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding: 8}}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as Array<string>, confirm, dataIndex)}
          style={{marginBottom: 8, display: 'block'}}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as Array<string>, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{width: 90}}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{width: 90}}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({closeDropdown: false});
              setSearchText(selectedKeys[0] as string);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />,
    onFilter: (value, record) => record[dataIndex]
      .toLowerCase()
      .toString()
      .includes(value.toString().toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), FILTER_TIMEOUT);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : text,
  });

  const columns: ColumnsType<TableData> = [
    {
      title: 'User',
      dataIndex: 'fullName',
      key: 'fullName',
      fixed: 'left',
      ...getColumnSearchProps('fullName'),
    },
    ...createDaysList(CURRENT_MONTH_OF_YEAR).map(date => ({
      title: getFormattedDate(date),
      dataIndex: date,
      key: date,
      sorter: (a: {[x: string]: string;}, b: {[x: string]: string;}) => {
        return compareDuration(b[date], a[date]);
      },
    })),
    {
      title: 'Monthly total',
      dataIndex: 'totalDuration',
      key: 'totalDuration',
      fixed: 'right',
      sorter: (a: {[x: string]: string;}, b: {[x: string]: string;}) => {
        return compareDuration(b['totalDuration'], a['totalDuration']);
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
    />
  );
};

export default Main;
