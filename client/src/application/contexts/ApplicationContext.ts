import { createContext } from 'react';
import HttpClient from '../../infra/http/HttpClient';

type Content = {
  httpClient: HttpClient;
};

export const ApplicationContext = createContext<Content>({
  httpClient: { request: () => {} },
});
