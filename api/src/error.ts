export const ERRORS = {
    INVALID_FORMAT: { code: "INVALID_FORMAT", http: 400, message: "Invalid format" },
    INTERNAL: { code: "INTERNAL", http: 500, message: "Internal Server Error" },
};

export type ErrorType = { code: string, http: number, message: string } 
