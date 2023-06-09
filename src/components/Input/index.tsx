import {
  useEffect,
  useRef,
  useState
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

interface Props {
  name: string;
  icon?: string;
  placeholder: string;
}

export function Input ({ name, icon: Icon, ...rest }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const { fieldName, defaultValue, registerField } = useField(name);

  function handleInputFocus () {
    console.log("Input focus")
    setIsFocused(true);
  }

  function handleInputBlur () {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {/* {Icon && <Icon size={20} />} */}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
