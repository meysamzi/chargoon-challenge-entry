import { Button, Checkbox, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons'
import { onDeleting, onChangeCheckBox } from '../../Utils/usersTableHandling'

const UsersTable = ({ selectedUsers, setSelectedUsers }: any) => {

    const content = (title: string) => {
        return (
            <div>
                <Button onClick={() => onDeleting(title, setSelectedUsers)}>حذف</Button>
            </div>
        )
    }

    return <div style={{ marginTop: '24px' }}>
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
}

export default UsersTable