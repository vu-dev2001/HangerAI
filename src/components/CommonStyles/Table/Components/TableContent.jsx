import { Checkbox } from "@mui/material";
import React, { Fragment, memo, useCallback, useEffect, useMemo } from "react";
import CommonStyles from "../..";
import { isArray } from "lodash";
import TableContentItem from "./TableContentItem";

const TableContent = ({
  rowData,
  calculateTemplate,
  columns,
  hasCheckbox,
  isOdd,
  selectedRows,
  handleSelectRow,
}) => {
  //! State

  const isSelected = useMemo(() => {
    if (!selectedRows) return false;

    if (isArray(selectedRows)) {
      for (const row of selectedRows) {
        if (row?.id === rowData?.id) return true;
      }
    }

    return false;
  }, [selectedRows, rowData]);

  //! Function
  const onSelectRow = useCallback(() => {
    handleSelectRow(rowData);
  }, [handleSelectRow, rowData]);

  //! Render
  const renderContent = useCallback(() => {
    return (
      <Fragment>
        {columns.map((column) => {
          return (
            <TableContentItem
              item={column}
              data={rowData}
              isOdd={isOdd}
              key={`${column?.id}-${rowData?.id}`}
            />
          );
        })}
      </Fragment>
    );
  }, [columns, rowData, isOdd]);

  return (
    <CommonStyles.Box
      sx={{
        display: "grid",
        gridTemplateColumns: calculateTemplate,
        cursor: "pointer",
        transition: "all .3s ease-in-out",
        "&:hover": {
          background: "#e7e7e7",
        },
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {hasCheckbox && (
        <CommonStyles.Box
          centered
          sx={{ padding: "16px", background: isOdd ? "#f2f4f7" : "#fff" }}
        >
          <Checkbox
            sx={{ padding: "0" }}
            checked={isSelected}
            onClick={onSelectRow}
          />
        </CommonStyles.Box>
      )}
      {renderContent()}
    </CommonStyles.Box>
  );
};

export default memo(TableContent);
