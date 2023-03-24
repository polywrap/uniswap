import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  margin: 1rem 0;
  font-weight: 500;
  color: #ddd;
  justify-content: space-between;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 8rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0d6efd;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #000;
  border-radius: 5px;
  overflow: hidden;
  `;

const DropdownArrow = styled.div`
  border: solid #ddd;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
  transform: rotate(45deg);
  margin-left: 0.5rem;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #ddd;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0d6efd;
  }
`;

interface Language {
  name: string;
  value: string;
}

interface LanguageDropdownProps {
  languages: Language[];
  defaultLanguage: string;
  onLanguageSelect: (language: string) => void;
}

function LanguageDropdown({
  languages,
  defaultLanguage,
  onLanguageSelect,
}: LanguageDropdownProps) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(defaultLanguage);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    onLanguageSelect(language);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={() => setShowDropdown(!showDropdown)}>
        {selectedLanguage}
        <DropdownArrow/>
      </DropdownButton>
      {showDropdown && (
        <DropdownList>
          {languages.map((language) => (
            <DropdownItem
              key={language.value}
              onClick={() => handleLanguageSelect(language.value)}
            >
              {language.name}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

export default LanguageDropdown;