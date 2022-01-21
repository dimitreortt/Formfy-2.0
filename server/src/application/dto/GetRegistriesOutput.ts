import RegistryDTO from '../../domain/dto/RegistryDTO';
import GetRegistryOutput from './GetRegistryOutput';

export default class GetRegistriesOutput {
  constructor(readonly output: GetRegistryOutput[]) {}
}
