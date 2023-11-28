import { AutoComplete, Button, Checkbox, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons'
import { NodeType } from '../../types';

interface Props {
  initialValue?: NodeType;
}

const UserAutoComplete = ({ initialValue }: Props) => {
  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  const renderTitle = (title: string) => (
    <span>
      {title}
    </span>
  );

  const usersData = initialValue?.users?.map((data: any) => { return { label: renderTitle(data?.title) } })

  return (
    <>
      <AutoComplete
        options={usersData}
        style={{ width: 200 }}
        onSelect={onSelect}
        placeholder="جستجوی کاربر"
      />
      <Button >افزودن</Button>
      <div style={{ marginTop: '24px' }}>
        {initialValue?.users?.length > 0 && <table className='usersTable'>
          <tbody>
            <tr>
              {["عملیات", "پیش فرض", "نام"].map(header => <th key={header}>{header}</th>)}
            </tr>
            {initialValue?.users?.map((user: any, index: number) =>
              <tr key={index}>
                <td align='center'>
                </td>
                <td align='center'><Checkbox checked={user.isDefault} /></td>
                <td align='center'>{user.title}</td>
              </tr>
            )}
          </tbody>
        </table>}
      </ div>
    </>
  );
};

export default UserAutoComplete;