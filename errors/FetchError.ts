export class FetchError extends Error {
    public status: number;
    public info: any;
    constructor(message: string, status: number, info?: any) {
        super(message);
        this.name = 'FetchError';
        this.status = status;
        this.info = info;
      }
}