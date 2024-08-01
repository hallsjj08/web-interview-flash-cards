interface ErrorResponse {
  title: string;
  message: string;
}

interface ResponseData<T> {
  hasError: boolean;
  data?: T;
  errorResponse?: ErrorResponse;
}

type FetchCB<T> = (response: ResponseData<T>) => void;

async function typedFetch<T>(url: URL, cb: FetchCB<T>, options?: RequestInit) {
  let responseData: ResponseData<T> = {
    hasError: false,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      responseData.data = data;
    } else {
      responseData = {
        hasError: true,
        errorResponse: {
          title: "Oops",
          message: "We messed up. Sorry!",
        },
      };
    }
  } catch (e) {
    responseData = {
      hasError: true,
      errorResponse: {
        title: "Oops",
        message: "We messed up. Sorry!",
      },
    };
  }

  cb(responseData);
}

export { typedFetch as fetch };
export type { ErrorResponse, ResponseData, FetchCB };
