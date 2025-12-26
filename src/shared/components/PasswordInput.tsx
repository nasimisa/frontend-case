import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface PasswordInputProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  autoComplete?: string;
}

export const PasswordInput = ({ placeholder, autoComplete, ...props }: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <InputGroup>
      <Input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...props}
      />
      <InputRightElement>
        <IconButton
          aria-label={show ? 'Hide password' : 'Show password'}
          icon={show ? <ViewOffIcon /> : <ViewIcon />}
          size='sm'
          variant='ghost'
          onClick={() => setShow(prev => !prev)}
        />
      </InputRightElement>
    </InputGroup>
  );
};
