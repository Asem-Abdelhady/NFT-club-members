export default interface Collection {
    [key: string]: {
      address: string;
      price: string;
      uri: string;
      id: number;
    };
  }