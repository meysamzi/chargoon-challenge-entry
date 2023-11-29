import { Tabs, Form } from 'antd';
import { NodeType } from '../../types';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import Accesses from './accesses';
import BasicInformation from './basic-information';

interface Props {
	updateNode: (key: string, data: any) => void
	nodeToEdit: NodeType
}

function FormComponent({ updateNode, nodeToEdit }: Props) {
	const [form] = Form.useForm()

	const handleSave = () => {
		form.validateFields().then(x => {
			console.log("edit ", x);
		})
	}

	return (
		<div className='detail'>
			<div>
				<Tabs>
					<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
						<div className='form-content'>
							<BasicInformation initialValue={nodeToEdit} form={form} />
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
		</div>
	);
}
export default FormComponent