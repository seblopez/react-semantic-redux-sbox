import {Grid, Pagination} from "semantic-ui-react";
import React from "react";

const TablePagination = ({dispatch, entity, pageSize, event}) => {
    if(!entity) return null;

    const entityCount = entity.length
    const totalPages = entityCount % pageSize > 0 ? Math.floor(entityCount / pageSize) + 1 : Math.floor(entityCount / pageSize);
    if(totalPages > 1) {
        return (
            <Grid>
                <Grid.Column>
                    <Pagination
                        floated='right'
                        totalPages={totalPages}
                        onPageChange={(e, data) => dispatch({ type: event, page: data.activePage, pageSize: pageSize, totalPages: totalPages})}
                    />
                </Grid.Column>
            </Grid>
        );
    } else {
        return null;
    }
}

export default TablePagination;