import { useState, useEffect } from 'react'
import { AutoComplete, Button } from 'antd';
import { NodeType } from '../../types';
import UsersTable from './usersTable';
import { getUsers } from '../../transportLayer';

interface Props {
  initialValue?: NodeType;
}

const UserAutoComplete = ({ initialValue }: Props) => {
  const [selectedUsers, setSelectedUsers] = useState([])
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
        options={options.filter(option => !selectedUsers.map(x => x.title).includes(option.label))}
        value={selectValue}
        style={{ width: 200 }}
        onSelect={onSelect}
        placeholder="جستجوی کاربر"
      />
      <Button onClick={() => {
        if (selectValue) {
          setSelectedUsers(prev => [...prev, { title: selectValue, isDefault: selectedUsers.map(x => x.isDefault).includes(true) ? false : true }])
          setSelectValue(undefined)
        }
      }} disabled={selectValue ? false : true}>افزودن</Button>
      <UsersTable selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
    </>
  );
};

export default UserAutoComplete;