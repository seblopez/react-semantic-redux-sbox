import styled from "styled-components";
import {Table} from "semantic-ui-react";

export const TableStyled = styled(Table)`
    &&& {
        border: none;
    }
`;

export const TableHeaderCellLeftUpperCornerStyled = styled(Table.HeaderCell)`
    &&&&& {
            border-left: 1px solid rgba(34,36,38,.1);
            border-top: 1px solid rgba(34,36,38,.1);
            border-top-left-radius: .28571429rem;
    }
`;

export const TableHeaderCellTopStyled = styled(Table.HeaderCell)`
    &&&& {
        border-top: 1px solid rgba(34,36,38,.1);
    }
`;

export const TableHeaderCellRightUpperCornerStyled = styled(Table.HeaderCell)`
    &&&&& {
            border-right: 1px solid rgba(34,36,38,.1);
            border-top: 1px solid rgba(34,36,38,.1);
            border-top-right-radius: .28571429rem;
    }
`;

export const TableHeaderEmptyCellStyled = styled(Table.HeaderCell)`
    &&&& {
        background: none;
        border-bottom: 1px solid rgba(34,36,38,.1);
        border-left: none;
    }
`;

export const TableCellAction = styled(Table.Cell)`
    &&&& {
        text-align:center; 
        vertical-align:middle;        
        border-left: none;
        border-right: 1px solid rgba(34,36,38,.1);
    }
`;

export const TableRightmostColumn = styled(Table.Cell)`
    & {
        border-right: 1px solid rgba(34,36,38,.1);
    }
`;

export const TableLeftmostColumn = styled(Table.Cell)`
    &&&&& {
            border-left: 1px solid rgba(34,36,38,.1);
        }
`;