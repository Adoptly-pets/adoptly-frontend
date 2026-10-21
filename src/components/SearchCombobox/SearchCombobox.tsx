import { useState } from 'react';
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

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(value.toLowerCase())
  );

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
      />
      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <li
                key={option}
                className={styles.option}
                onMouseDown={e => {
                  e.preventDefault();
                  onChange(option);
                  setIsOpen(false);
                }}
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
