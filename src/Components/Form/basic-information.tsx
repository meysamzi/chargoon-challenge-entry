import { useEffect } from 'react'
import { Form, Input } from 'antd';
import { NodeType } from '../../types';
import UserAutoComplete from './user-autocomplete';

interface Props {
	initialValue?: NodeType;
}

function BasicInformation({ initialValue }: Props) {
	const [form] = Form.useForm();
	useEffect(() => {		
		form.setFieldsValue({ title: initialValue?.title, key: initialValue?.key })
	}, [initialValue])

	return (
		<Form form={form} initialValues={initialValue}>
			<Form.Item
				rules={[{ required: true, message: 'عنوان الزامسیست' }]}
				name="title" label="عنوان" labelCol={{ span: 2 }}>
				<Input />
			</Form.Item >
			<Form.Item name="key" label="کد" labelCol={{ span: 2 }}>
				<Input />
			</Form.Item>
			<Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
				<UserAutoComplete />
			</Form.Item>
		</Form>
	);
}

export default BasicInformation