import { useState, useEffect } from 'react'
import { AutoComplete, Button, Checkbox } from 'antd';
import { NodeType } from '../../types';

interface Props {
  initialValue?: NodeType;
}

interface IUser {
  title: string
  isDefault: boolean
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

  const onChangeCheckBox = (user: IUser) => {
    if (!user.isDefault) {
      const users = selectedUsers.map(x => {
        return { ...x, isDefault: x.title === user.title ? true : false }
      })
      setSelectedUsers(users)
    }
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
                </td>
                <td align='center'><Checkbox checked={user.isDefault} onChange={() => onChangeCheckBox(user)} /></td>
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