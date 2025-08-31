import type { ZodTypeAny } from 'zod';

import dayjs from 'dayjs';
import { z as zod } from 'zod';

// ----------------------------------------------------------------------

type MessageMapProps = {
  required?: string;
  invalid_type?: string;
};

export const schemaHelper = {
  /**
   * Phone number
   * Apply for phone number input.
   */
  phoneNumber: (props?: { message?: MessageMapProps; isValid?: (text: string) => boolean }) =>
    zod
      .string({
        required_error: props?.message?.required ?? 'Phone number is required!',
        invalid_type_error: props?.message?.invalid_type ?? 'Invalid phone number!',
      })
      .min(1, { message: props?.message?.required ?? 'Phone number is required!' })
      .refine((data) => props?.isValid?.(data), {
        message: props?.message?.invalid_type ?? 'Invalid phone number!',
      }),
  /**
   * Date
   * Apply for date pickers.
   */
  date: (props?: { message?: MessageMapProps }) =>
    zod.union([zod.string(), zod.number(), zod.date(), zod.null()]).transform((value, ctx) => {
      if (value === null || value === undefined || value === '') {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: props?.message?.required ?? 'Date is required!',
        });

        return null;
      }

      const isValid = dayjs(value).isValid();

      if (!isValid) {
        ctx.addIssue({
          code: zod.ZodIssueCode.invalid_date,
          message: props?.message?.invalid_type ?? 'Invalid date!',
        });
      }

      return value;
    }),
  /**
   * Editor
   * defaultValue === '' | <p></p>
   * Apply for editor
   */
  editor: (props?: { message: string }) =>
    zod.string().min(8, { message: props?.message ?? 'Content is required!' }),
  /**
   * Nullable Input
   * Apply for input, select... with null value.
   */
  nullableInput: <T extends ZodTypeAny>(schema: T, options?: { message?: string }) =>
    schema.nullable().transform((val, ctx) => {
      if (val === null || val === undefined) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: options?.message ?? 'Field is required!',
        });
        return val;
      }
      return val;
    }),
  /**
   * Boolean
   * Apply for checkbox, switch...
   */
  boolean: (props?: { message: string }) =>
    zod.boolean().refine((val) => val, {
      message: props?.message ?? 'Field is required!',
    }),
  /**
   * Slider
   * Apply for slider with range [min, max].
   */
  sliderRange: (props: { message?: string; min: number; max: number }) =>
    zod
      .number()
      .array()
      .refine((data) => data[0] >= props?.min && data[1] <= props?.max, {
        message: props.message ?? `Range must be between ${props?.min} and ${props?.max}`,
      }),
  /**
   * File
   * Apply for upload single file.
   */
  file: (props?: { message: string }) =>
    zod.custom<File | string | null>().transform((data, ctx) => {
      const hasFile = data instanceof File || (typeof data === 'string' && !!data.length);

      if (!hasFile) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: props?.message ?? 'File is required!',
        });
        return null;
      }

      return data;
    }),
  /**
   * Files
   * Apply for upload multiple files.
   */
  files: (props?: { message: string; minFiles?: number }) =>
    zod.array(zod.custom<File | string>()).transform((data, ctx) => {
      const minFiles = props?.minFiles ?? 2;

      if (!data.length) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: props?.message ?? 'Files is required!',
        });
      } else if (data.length < minFiles) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: `Must have at least ${minFiles} items!`,
        });
      }

      return data;
    }),
};

// ----------------------------------------------------------------------

/**
 * Test one or multiple values against a Zod schema.
 */
export function testCase<T extends ZodTypeAny>(schema: T, inputs: unknown[]) {
  const textGreen = (text: string) => `\x1b[32m${text}\x1b[0m`;
  const textRed = (text: string) => `\x1b[31m${text}\x1b[0m`;
  const textGray = (text: string) => `\x1b[90m${text}\x1b[0m`;

  inputs.forEach((input) => {
    const result = schema.safeParse(input);
    const type = textGray(`(${typeof input})`);
    const value = JSON.stringify(input);

    const successValue = textGreen(`✅ Valid - ${value}`);
    const errorValue = textRed(`❌ Error - ${value}`);

    if (!result.success) {
      console.info(`${errorValue} ${type}:`, JSON.stringify(result.error.format(), null, 2));
    } else {
      console.info(`${successValue} ${type}:`, JSON.stringify(result.data, null, 2));
    }
  });
}

// Example usage:
// testCase(schemaHelper.boolean(), [true, false, 'true', 'false', '', 1, 0, null, undefined]);

// testCase(schemaHelper.date(), [
//   '2025-04-10',
//   1712736000000,
//   new Date(),
//   '2025-02-30',
//   '04/10/2025',
//   'not-a-date',
//   '',
//   null,
//   undefined,
// ]);

// testCase(
//   schemaHelper.nullableInput(
//     zod
//       .number({ coerce: true })
//       .int()
//       .min(1, { message: 'Age is required!' })
//       .max(80, { message: 'Age must be between 1 and 80' })
//   ),
//   [2, '2', 79, '79', 81, '81', null, undefined]
// );
