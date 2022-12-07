import React, {useCallback, useMemo} from 'react';

import {SimpleLeadFormFieldName} from '../SimpleLeadForm/SimpleLeadForm';

export enum CustomLeadFormType {
  Fence,
  ArtificialGrass,
};

const useCustomLeadForm = (type: CustomLeadFormType) => {
  const title = useMemo(() => {
    switch (type) {
      case CustomLeadFormType.Fence:
        return <>Let’s talk about <br/>your fence project</>;
      default:
        return <>Let’s talk about <br/>your project</>;
    }
  }, [type]);

  const onFieldDisplay = useCallback((field: SimpleLeadFormFieldName) => {
    switch (type) {
      case CustomLeadFormType.ArtificialGrass:
        if (field === SimpleLeadFormFieldName.FenceType) return false;
        return true;
      default:
        return true;
    }
  }, [type]);

  return {title, onFieldDisplay};
};

export default useCustomLeadForm;
