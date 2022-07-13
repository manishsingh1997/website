import React, {ChangeEvent, useCallback, useState} from 'react';

type CitySearchInputFieldProps = {
  onChange(value: string): void;
};

// mocking due to google api integration passed down
const CitySearchInputField = (props: CitySearchInputFieldProps) => {
  const [value, setValue] = useState('');
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      props.onChange(e.target.value);
    }, [props.onChange]);

  return <input onChange={handleChange} placeholder="enter city" value={value} />;
};

export default CitySearchInputField;
