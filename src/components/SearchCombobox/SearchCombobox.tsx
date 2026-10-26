import { useEffect, useRef, useState } from 'react';
import styles from './SearchCombobox.module.css';

export type Option = {
  value: string;
  label: string;
};

type SearchComboboxProps = {
  id?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  emptyText?: string;
};

const SearchCombobox = ({
  id,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  emptyText,
}: SearchComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const selectedLabel =
    options.find(option => option.value === value)?.label || '';
  const displayValue = isFocused ? query : selectedLabel;

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex(prevIndex =>
        prevIndex >= filteredOptions.length - 1 ? prevIndex : prevIndex + 1
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prevIndex =>
        prevIndex <= 0 ? prevIndex : prevIndex - 1
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      onChange(filteredOptions[highlightedIndex].value);
      setIsOpen(false);
      setHighlightedIndex(-1);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [value]);

  useEffect(() => {
    if (highlightedIndex < 0 || !listRef.current) return;
    const el = listRef.current.children[highlightedIndex] as
      | HTMLElement
      | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  return (
    <div className={styles.container}>
      <input
        id={id}
        value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={e => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setQuery('');
          setIsFocused(true);
          setIsOpen(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          setIsOpen(false);
        }}
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        onKeyDown={handleKeyDown}
      />
      {isOpen && (
        <ul ref={listRef} className={styles.dropdown} role="listbox">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                className={`${styles.option} ${index === highlightedIndex ? styles.highlighted : ''}`}
                onMouseDown={e => {
                  e.preventDefault();
                  onChange(option.value);
                  setIsOpen(false);
                  setIsFocused(false);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className={styles.empty}>{emptyText}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchCombobox;
