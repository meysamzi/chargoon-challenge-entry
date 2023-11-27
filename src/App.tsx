import { useEffect, useState, useRef } from "react";
import { Alert } from 'antd';
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from './Components/Tree'
import { getNodes } from "./transportLayer";
import { NodeType } from "./types";
import { onDeleteNode, onPasteNode } from "./Utils/nodeHandling";

function App() {
  const [showEdit, setShowEdit] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [removeParent, setRemoveParent] = useState(false)
  const [isNodeCut, setIsNodeCut] = useState(null)
  const [nodeToEdit, setNodeToEdit] = useState<NodeType>()
  const nodeClipboard = useRef<NodeType>()

  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  }

  useEffect(() => {
    fetchTreeData()
  }, [])

  const handleContextMenuClick = (actionKey: any, node?: NodeType) => {
    switch (actionKey) {
      case 'ACTION2':
        nodeClipboard.current = node
        break;
      case 'ACTION3':
        onPasteNode(node, nodeClipboard, treeData, setTreeData, setIsNodeCut)
        break;
      case 'ACTION4':
        onDeleteNode(node, treeData, setTreeData, setRemoveParent)
        break;
    }
  }

  const handleUpdateTree = (nodes: NodeType[]) => {

  }

  const handleUpdateNode = (key: string, data: any) => {

  }

  const onSelectNodeToEdit = (node: NodeType) => {
    setNodeToEdit(node)
  }

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree
      }}
    >
      <div className="App">
        {removeParent && (<Alert
          message="You can't remove a parent"
          type="error"
          closable
          style={{ width: "25%", position: "absolute", left: "0", zIndex: "2" }}
          onClose={() => setRemoveParent(false)}
        />)}
        {isNodeCut && (<Alert
          message="You have not choosen any node to cut"
          type="error"
          closable
          style={{ width: "25%", position: "absolute", left: "0", zIndex: "2" }}
          onClose={() => setIsNodeCut(null)}
        />)}
        <Sidebar>
          <ExtendedTree handleContextMenuClick={handleContextMenuClick} onSelectNodeToEdit={onSelectNodeToEdit} />
        </Sidebar>
        {showEdit && <Form updateNode={handleUpdateNode} nodeToEdit={nodeToEdit} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
