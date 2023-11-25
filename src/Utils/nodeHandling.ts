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

export const onPasteNode = (node: NodeType, nodeClipboard: any, treeData: any[], setTreeData: any, setIsNodeCut: any) => {
    if (nodeClipboard.current) {
        const newTreeData = [...treeData]
        newTreeData.forEach(function iter(item, index, objects) {
            if (item.children.length === 0 && item.key === nodeClipboard.current.key) {
                objects.splice(index, 1);
                nodeClipboard.current.parentKey = node.key
                // @ts-ignore
                nodeClipboard.current.hierarchy = [...node.hierarchy, nodeClipboard.current.key]
                node.children.unshift(nodeClipboard.current)
                nodeClipboard.current = undefined
                setTreeData(newTreeData)
            } (item.children || []).forEach(iter);
        });
    } else {
        setIsNodeCut(true)
    }
}