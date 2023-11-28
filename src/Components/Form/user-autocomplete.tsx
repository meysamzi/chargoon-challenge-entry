import { AutoComplete, Button } from 'antd';
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
    </>
  );
};

export default UserAutoComplete;