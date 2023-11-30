import { useEffect } from 'react';
import { Form, Input, FormInstance } from 'antd';
import { NodeType } from '../../types';
import UserAutoComplete from './user-autocomplete';

interface Props {
	initialValue?: NodeType;
	form: FormInstance<any>
	selectedUsers: any
	setSelectedUsers: any
}

function BasicInformation({ initialValue, form, selectedUsers, setSelectedUsers }: Props) {

	useEffect(() => {
		form.setFieldsValue({ title: initialValue?.title, key: initialValue?.key, users: initialValue?.users })
	}, [initialValue])

	return (
		<Form form={form} initialValues={initialValue}>
			<Form.Item
				rules={[{ required: true, message: 'عنوان الزامسیست' }]}
				name="title" label="عنوان" labelCol={{ span: 2 }}>
				<Input />
			</Form.Item>
			<Form.Item rules={[{ required: true, message: 'کد الزامسیست' }]} name="key" label="کد" labelCol={{ span: 2 }}>
				<Input />
			</Form.Item>
			<Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
				<UserAutoComplete initialValue={initialValue} selectedUsers={selectedUsers}
					setSelectedUsers={setSelectedUsers} />
			</Form.Item>
		</Form>
	);
}

export default BasicInformation