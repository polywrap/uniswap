import React, { useState } from 'react';
import './OpenCloseBlock.css';

interface OpenCloseBlockProps {
  title: string;
}

const OpenCloseBlock: React.FC<OpenCloseBlockProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="OpenCloseBlock">
      <div className="OpenCloseBlockHeader" onClick={() => setIsOpen(!isOpen)}>
        <span className="OpenCloseBlockHeaderSymbol">{isOpen ? '-' : '+'}</span>
        <span>{title}</span>
      </div>
      {isOpen && <div className="OpenCloseBlockContent">{children}</div>}
    </div>
  );
}

export default OpenCloseBlock;