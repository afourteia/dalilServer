
const decode = (uriString, queryType) => {
    switch(queryType) {
        case 'multi-select':
            return multiSelectDecoder(uriString);

        case 'date-range':
            return dateRangeDecoder(uriString);
        
        case 'number-range':
            return numberRangeDecoder(uriString);

        case 'sort': 
            return sortByDecoder(uriString);
    }
};

// return multi-select query
const multiSelectDecoder = (uriString) => {
    const decoded = decodeURI(uriString).split(',');
    return { $in: decoded }
};

// return date-range query
const dateRangeDecoder = (uriString) => {
    const decoded = decodeURI(uriString).split(',');
    let query = {};

    if(decoded[0] && decoded[1]) {
        query = { $gte: new Date(decoded[0]), $lte: new Date(decoded[1]) };
    } else if(!decoded[0] && decoded[1]) {
        query = { $lte: new Date(decoded[1]) };
    } else if(decoded[0] && !decoded[1]) {
        query = { $gte: new Date(decoded[0]) };
    }

    return query;
};

// return number-range query
const numberRangeDecoder = (uriString) => {
    const decoded = decodeURI(uriString).split(',');
    let query = {};

    if(decoded[0] && decoded[1]) {
        query = { $gte: decoded[0], $lte: decoded[1] };
    } else if(!decoded[0] && decoded[1]) {
        query = { $lte: decoded[1] };
    } else if(decoded[0] && !decoded[1]) {
        query = { $gte: decoded[0] };
    }

    return query;
};

// return sort query
const sortByDecoder = (uriString) => {
    const decoded =  decodeURI(uriString).split(',');
    let query = {};

    decoded.map(item => {
        let sortItem = item.split(':');
        query[sortItem[0]]= sortItem[1] 
        return query;
    });

    return query;
}

module.exports = decode;