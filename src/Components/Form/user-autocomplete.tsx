import { useState, useEffect } from 'react'
import { AutoComplete, Button, Checkbox, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons'
import { NodeType } from '../../types';
import { onDeleting, onChangeCheckBox } from '../../Utils/usersTableHandling'

interface Props {
  initialValue?: NodeType;
}

const UserAutoComplete = ({ initialValue }: Props) => {
  const [selectedUsers, setSelectedUsers] = useState([])
  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  useEffect(() => {
    if (initialValue) setSelectedUsers(initialValue.users)
  }, [initialValue])

  const renderTitle = (title: string) => (
    <span>
      {title}
    </span>
  );

  const usersData = initialValue?.users?.map((data: any) => { return { label: renderTitle(data?.title) } })

  const content = (title: string) => {
    return (
      <div>
        <Button onClick={() => onDeleting(title, setSelectedUsers)}>حذف</Button>
      </div>
    )
  }

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
        {selectedUsers?.length > 0 && <table className='usersTable'>
          <tbody>
            <tr>
              {["عملیات", "پیش فرض", "نام"].map(header => <th key={header}>{header}</th>)}
            </tr>
            {selectedUsers?.map((user: any, index: number) =>
              <tr key={index}>
                <td align='center'>
                  <Popover content={() => content(user.title)} title="عملیات">
                    <EllipsisOutlined rev={1} />
                  </Popover>
                </td>
                <td align='center'><Checkbox checked={user.isDefault} onChange={() => onChangeCheckBox(user, selectedUsers, setSelectedUsers)} /></td>
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