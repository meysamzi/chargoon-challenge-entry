import { useEffect, useState } from "react";
import { Alert } from 'antd';
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from './Components/Tree'
import { getNodes } from "./transportLayer";
import { NodeType } from "./types";
import { onDeleteNode } from "./Utils/nodeHandling";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [removeParent, setRemoveParent] = useState(false)

  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  }

  useEffect(() => {
    fetchTreeData()
  }, [])

  const handleContextMenuClick = (actionKey: any, node?: NodeType) => {
    switch (actionKey) {
      case 'ACTION4':
        onDeleteNode(node, treeData, setTreeData, setRemoveParent)
        break;
    }
  }

  const handleUpdateTree = (nodes: NodeType[]) => {

  }

  const handleUpdateNode = (key: string, data: any) => {

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
        <Sidebar>
          <ExtendedTree handleContextMenuClick={handleContextMenuClick} />
        </Sidebar>
        {showEdit && <Form item={selectedItem} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
