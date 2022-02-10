export class RegistriesAssembler {
  static assembly(rawResponse: any) {
    // API Specific conversion
    return rawResponse.registries.map((registryData: any) => {
      return registryData.registry;
    });
  }
}
