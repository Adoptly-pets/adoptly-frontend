import { useEffect, useRef, useState } from 'react';
import styles from './SearchCombobox.module.css';

type SearchComboboxProps = {
  id?: string;
  options: string[];
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
  const [higihlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(value.toLowerCase())
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
    } else if (e.key === 'Enter' && higihlightedIndex >= 0) {
      e.preventDefault();
      onChange(filteredOptions[higihlightedIndex]);
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
    if (higihlightedIndex < 0 || !listRef.current) return;
    const el = listRef.current.children[higihlightedIndex] as
      | HTMLElement
      | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [higihlightedIndex]);

  return (
    <div className={styles.container}>
      <input
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={e => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
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
                key={option}
                className={`${styles.option} ${index === higihlightedIndex ? styles.highlighted : ''}`}
                onMouseDown={e => {
                  e.preventDefault();
                  onChange(option);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
              >
                {option}
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
