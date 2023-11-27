import { Tabs } from 'antd';
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

	const handleSave = () => {
		updateNode('key', {})
	}

	return (
		<div className='detail'>
			<div>
				<Tabs>
					<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
						<div className='form-content'>
							<BasicInformation initialValue={nodeToEdit} />
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
			<ActionBar actions={[]} />
		</div>
	);
}
export default FormComponent