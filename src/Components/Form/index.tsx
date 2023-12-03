import { useState } from 'react';
import { Tabs, Form, Alert } from 'antd';
import { NodeType } from '../../types';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import Accesses from './accesses';
import BasicInformation from './basic-information';

interface Props {
	updateNode: (key: string, data: NodeType, type: 'save' | 'add') => Promise<boolean>
	nodeToEdit: NodeType
}

function FormComponent({ updateNode, nodeToEdit }: Props) {
	const [isFormModified, setIsFormModified] = useState(null)
	const [selectedUsers, setSelectedUsers] = useState([])
	const [form] = Form.useForm()

	const handleAddNewNode = () => {
		form.validateFields().then(x => {
			updateNode(x.key, { ...x }, "add").then(callBack => setIsFormModified(callBack))
		})
	}

	const handleSave = () => {
		form.validateFields().then(x => {
			updateNode(x.key, { ...nodeToEdit, users: selectedUsers }, "save").then(callBack => { setIsFormModified(callBack) })
		})
	}

	return (
		<div className='detail'>
			<div>
				<Tabs>
					<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
						<div className='form-content'>
							<BasicInformation initialValue={nodeToEdit} form={form} selectedUsers={selectedUsers}
								setSelectedUsers={setSelectedUsers} />
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="دسترسی ها" key="item-2">
						<div className='form-content'>
							<ErrorBoundry>
								<Accesses initialValue={{}} />
							</ErrorBoundry>
						</div>
					</Tabs.TabPane>
				</Tabs>
			</div>
			<ActionBar actions={nodeToEdit ? [{ title: 'ذخیره', handler: handleSave }] : [{ title: 'افزودن', handler: handleAddNewNode }]} />
			{isFormModified && (<Alert
				message="The form Has been Successfully Modified"
				type="success"
				closable
				style={{ width: "25%", position: "absolute", left: "0", zIndex: "2" }}
				onClose={() => setIsFormModified(null)}
			/>)}
		</div>
	);
}
export default FormComponent