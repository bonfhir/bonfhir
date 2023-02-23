import {
  EmptyProps,
  ErrorPanelProps,
  FhirUIComponentsRenderer,
  LoaderProps,
  TableProps,
} from "@bonfhir/ui-components/r4b";
import {
  AlertProps,
  EmptyProps as AntdEmptyProps,
  SpinProps,
  TableColumnProps as AntdTableColumnProps,
  TableProps as AntdTableProps,
} from "antd";
import { empty } from "./empty";
import { errorPanel } from "./error-panel";
import { loader } from "./loader";
import { table } from "./table";

export const antdFhirUIComponentsRenderer = (): FhirUIComponentsRenderer => ({
  empty: (props) => empty(props as EmptyProps<AntdEmptyProps>),

  errorPanel: (props) => errorPanel(props as ErrorPanelProps<AlertProps>),

  loader: (props) => loader(props as LoaderProps<SpinProps>),

  table: (props) =>
    table(
      props as unknown as TableProps<
        AntdTableProps<unknown>,
        AntdTableColumnProps<unknown>
      >
    ),
});
