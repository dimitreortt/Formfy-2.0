import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRegistries } from '../../../application/usecase/useGetRegistries';
import { Button } from '@mui/material';
import { RootState } from '../../../application/store/configureStore';
import { useSelector } from 'react-redux';

export const OpenRegistriesButton = () => {
  const { formId }: any = useParams();
  const { getRegistries } = useGetRegistries(parseInt(formId));
  const registriesCount = useSelector((state: RootState) => state.registries.registries?.length);

  useEffect(() => {
    getRegistries();
  }, []);

  return (
    <div>
      <Button variant='contained' color='success'>
        {' '}
        Registries {registriesCount | 0}
      </Button>
    </div>
  );
};
