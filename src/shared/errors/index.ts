import { ZodIssue } from 'zod';

export type IDefaultError = {
  code: number;
  message: string;
  fields?: ZodIssue[];
};

export class DefaultError extends Error {
  code: number;
  error: string;
  fields?: { field: string | number; message: string }[];

  constructor({ code, message, fields }: IDefaultError) {
    super(message);
    this.error = message;
    this.code = code;

    if (fields) {
      this.fields = fields.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));
    }
  }
}
