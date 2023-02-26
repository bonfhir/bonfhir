import {
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
  useFormikContext,
} from "formik";
import noop from "lodash/noop";
import { ReactElement, useEffect } from "react";

export type FhirFormProps<TValues extends FormikValues = FormikValues> = Omit<
  FormikConfig<TValues>,
  "onSubmit"
> & {
  onSubmit?:
    | ((
        values: TValues,
        formikHelpers: FormikHelpers<TValues>
      ) => void | Promise<any>)
    | null
    | undefined;
  onChange?: (values: TValues) => void | null | undefined;
};

export function FhirForm<TValues extends FormikValues = FormikValues>(
  props: FhirFormProps<TValues>
) {
  const { onChange, onSubmit, children, ...formikProps } = props;

  return (
    <Formik onSubmit={onSubmit ?? noop} {...formikProps}>
      {() => (
        <>
          <FormObserver onChange={onChange} />
          {children}
        </>
      )}
    </Formik>
  );
}

export function FormObserver<TValues extends FormikValues = FormikValues>({
  onChange,
}: {
  onChange?: (values: TValues) => void | null | undefined;
}): ReactElement | null {
  const { values } = useFormikContext<TValues>();

  useEffect(() => {
    onChange?.(values);
  }, [values]);

  return null;
}
