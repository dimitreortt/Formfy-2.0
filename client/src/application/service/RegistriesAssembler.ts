export class RegistriesAssembler {
  static assembly(rawResponse: any) {
    console.log(rawResponse);

    // API Specific conversion
    return rawResponse.registries.map((registryData: any) => {
      return registryData.registry;
    });
  }
}
