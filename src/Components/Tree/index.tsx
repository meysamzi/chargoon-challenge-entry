import { Input, Tree } from 'antd';
import React, { useContext, useRef, useState } from 'react';
import AppContext from '../../appContext';
import { NodeType } from '../../types';
import Node from './node';
import SearchResult from './searchResult';

const { Search } = Input;

interface Props {
  handleContextMenuClick: (key: string) => void;
  onSelectNodeToEdit(node: NodeType): void;
}

const TreeExtended: React.FC<Props> = ({ handleContextMenuClick, onSelectNodeToEdit }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const searchedKeyword = useRef();
  const [searchResultVisible, setSearchResultVisible] = useState(true);
  const { treeData } = useContext(AppContext);

  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  };

  const handlePressEnter = () => {
    setSearchResultVisible(true)
  }

  const titleRenderer = (node: NodeType) => {
    return <Node node={node} handleContextMenuClick={handleContextMenuClick} />
  }

  return (
    <div className='tree-wrap'>
      <Search style={{ marginBottom: 8 }} placeholder="جستجو" onChange={handleSearchInputChange} onPressEnter={handlePressEnter} />
      <Tree
        onSelect={(selectedKeys, info) => onSelectNodeToEdit(info.node as NodeType)}
        multiple={false}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
      />
      {searchResultVisible && <SearchResult items={[]} />}
    </div>
  );
};

export default TreeExtended;