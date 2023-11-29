import { Button } from 'antd';

interface ActionType {
	title: string;
	handler: () => void;
}

interface Props {
	actions: ActionType[];
}

function ActionBar({ actions }: Props) {

	return <div className='actionbar'>
		{actions?.map((x, index) => <Button key={index} type='primary' onClick={x.handler}>{x.title}</Button>)}
	</div>;
}

export default ActionBar