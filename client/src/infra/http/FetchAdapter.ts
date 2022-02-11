import HttpClient from "./HttpClient";

type HttpRequestMethod = "POST" | "GET" | "PATCH" | "DELETE";

export class FetchAdapter implements HttpClient {
  request(url: string, method: HttpRequestMethod, data?: object): Promise<any> {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
    };
    return fetch(url, options)
      .then(async (response: Response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");

        const data = isJson ? await response.json() : null;

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        return data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
