export interface ITableColumn {
  label: string;
  id: string;
  accessor?: (props: { [key: string]: any }) => JSX.Element;
}
