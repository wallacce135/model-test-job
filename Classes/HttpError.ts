export class HttpError extends Error {
    constructor(message: string, status?: number) {
        super(message)

        this.status = status || 500;
    }

    public status: number;
}