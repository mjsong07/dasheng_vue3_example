// import { Rules,ValidateFieldsError } from "async-validator";
// import { InjectionKey } from "vue";

// export interface FormContext {
//   model:{
//     [props:string]:any
//   },
//   rules?:Rules
// }
// export interface ElFormItemContext {
//   prop?: string
//   validate(trigger: string, callback?: ValidateFieldCallback): void
// }
// export interface ValidateFieldCallback {
//   (isValid?: string, invalidFields?: ValidateFieldsError): void
// }

// export const elFormKey: InjectionKey<FormContext> = Symbol('elForm')
// export const elFormItemKey: InjectionKey<ElFormItemContext> =
//   Symbol('elFormItem')

import { InjectionKey } from "@vue/runtime-core";
import { Rules, Values } from "async-validator";

export type FormData = {
  model: Record<string, unknown>;
  rules?: Rules;
};

export type FormItem = {
  validate: () => Promise<Values>;
};

export type FormType = {
  validate: (cb: (isValid: boolean) => void) => void;
};

export const key: InjectionKey<FormData> = Symbol("form-data");
