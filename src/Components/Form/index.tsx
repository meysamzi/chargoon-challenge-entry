import { useState } from 'react';
import { Tabs, Form, Alert } from 'antd';
import { NodeType } from '../../types';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import Accesses from './accesses';
import BasicInformation from './basic-information';

interface Props {
	updateNode: (data: NodeType) => Promise<boolean>
	nodeToEdit: NodeType
}

function FormComponent({ updateNode, nodeToEdit }: Props) {
	const [isUserTableModified, setIsUserTableModified] = useState(null)
	const [selectedUsers, setSelectedUsers] = useState([])
	const [form] = Form.useForm()

	const handleSave = () => {
		form.validateFields().then(x => {
			console.log("x ", x);
			updateNode({ ...nodeToEdit, users: selectedUsers }).then(callBack => { setIsUserTableModified(callBack) })
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
			<ActionBar actions={[{ title: 'ذخیره', handler: handleSave }]} />
			{isUserTableModified && (<Alert
				message="The table has been successfully modified"
				type="success"
				closable
				style={{ width: "25%", position: "absolute", left: "0", zIndex: "2" }}
				onClose={() => setIsUserTableModified(null)}
			/>)}
		</div>
	);
}
export default FormComponent