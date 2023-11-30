import { useState, useEffect } from 'react'
import { AutoComplete, Button } from 'antd';
import { NodeType } from '../../types';
import UsersTable from './usersTable';
import { getUsers } from '../../transportLayer';
import { addNewUser } from '../../Utils/usersTableHandling';

interface Props {
  initialValue?: NodeType;
  selectedUsers: any
  setSelectedUsers: any
}

const UserAutoComplete = ({ initialValue, selectedUsers, setSelectedUsers }: Props) => {
  const [selectValue, setSelectValue] = useState<string>()
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const onSelect = (data: string) => {
    setSelectValue(data)
  };

  useEffect(() => {
    if (initialValue) setSelectedUsers(initialValue.users)
  }, [initialValue])

  useEffect(() => {
    getUsers().then((users) => {
      setOptions(users);
    })
  }, []);

  return (
    <>
      <AutoComplete
        options={options.filter(option => !selectedUsers.map((x: any) => x.title).includes(option.label))}
        value={selectValue}
        style={{ width: 200 }}
        onSelect={onSelect}
        placeholder="جستجوی کاربر"
      />
      <Button onClick={() => addNewUser(selectValue, selectedUsers, setSelectedUsers, setSelectValue)} disabled={selectValue ? false : true}>افزودن</Button>

      <UsersTable selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
    </>
  );
};

export default UserAutoComplete;