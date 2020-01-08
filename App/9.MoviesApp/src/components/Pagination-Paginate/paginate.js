import _ from 'lodash';

export function paginate (items, pageNumber, pageSize){
    const startIndex = (pageNumber - 1) * pageSize; //calcutating the starting index of the items of this page
 //  taking all the items starting from "startIndex" and convert the lodash wrapper to a regular array (using the chain value)
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
}