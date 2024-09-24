import { FlexboxGrid, List } from "rsuite";

const NoEditRow = ({ row }) => {
  return (
    <List.Item>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={6}>
          <b>{row.label}</b>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={14}>{row.value}</FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  );
};

export default NoEditRow;
