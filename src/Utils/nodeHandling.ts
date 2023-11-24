import { NodeType } from "../types";

export const onDeleteNode = (node: NodeType, treeData: any, setTreeData: any, setRemoveParent: any) => {
    if (node.children.length === 0) {
        const newTreeData = [...treeData]
        newTreeData.forEach(function iter(item, index, object) {
            if (item.key === node.key) {
                object.splice(index, 1);
                setTreeData(newTreeData)
            } (item.children || []).forEach(iter);
        });
    } else setRemoveParent(true)
}