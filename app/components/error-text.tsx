import type { FormState } from "react-hook-form";

export interface ErrorTextProps {
  name: string;
  formState: FormState<any>;
}

export default function ErrorText({ name, formState }: ErrorTextProps) {
  const errorMessage = formState && formState.dirtyFields[name] ? formState.errors[name]?.message as string : '';

  return errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null;
}
