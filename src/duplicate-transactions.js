function findDuplicateTransactions(transactions) {
    if(!Array.isArray(transactions)){
        throw Error
    }
    else if (Array.isArray(transactions) && transactions.length<2){
        return [];
    }

    //duplicates have same source, target, category and amount
    //but different time and id
    // first group elements having same source and target and amount together

    //group these elements by 1min diffs

    
    return transactions

}

export default findDuplicateTransactions;
