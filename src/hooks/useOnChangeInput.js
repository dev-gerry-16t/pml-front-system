import { useState } from "react";

const useOnChangeInput = (initialState = {}) => {
  const [dataForm, setDataForm] = useState(initialState);

  return [
    dataForm,
    (e) => {
      const {
        target: { value, name },
      } = e;
      setDataForm({
        ...dataForm,
        [name]: value,
      });
    },
    setDataForm,
  ];
};

export default useOnChangeInput;
