import { useState, useEffect } from 'react'
import { AutoComplete, Button } from 'antd';
import { NodeType } from '../../types';
import UsersTable from './usersTable';

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

  return (
    <>
      <AutoComplete
        options={usersData}
        style={{ width: 200 }}
        onSelect={onSelect}
        placeholder="جستجوی کاربر"
      />
      <Button >افزودن</Button>
      <UsersTable selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
    </>
  );
};

export default UserAutoComplete;