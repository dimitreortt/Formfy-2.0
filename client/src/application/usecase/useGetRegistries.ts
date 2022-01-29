import { RegistriesAssembler } from './../service/RegistriesAssembler';
import { RegistriesGateway } from './../../infra/api/RegistriesGateway';
import { ApplicationContext } from '../contexts/ApplicationContext';
import { useContext } from 'react';
import { useActions } from '../hooks/useActions';

export const useGetRegistries = (formId: number) => {
  const {
    getRegistries: getRegistriesAction,
    setRegistries,
    // setLoadRegistriesFail,
    // setLoadRegistriesSuccess,
  } = useActions();

  const { httpClient } = useContext(ApplicationContext);
  const registriesGateway = new RegistriesGateway(httpClient);

  const getRegistries = async () => {
    getRegistriesAction();
    try {
      const response = await registriesGateway.getRegistries(formId);
      const registries = RegistriesAssembler.assembly(response);
      // setLoadRegistriesSuccess();
      setRegistries(registries);
    } catch (error) {
      console.log(error);
      // setLoadRegistriesFail();
    }
  };

  return { getRegistries };
};
