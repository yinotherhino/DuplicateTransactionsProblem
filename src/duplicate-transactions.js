function findDuplicateTransactions(transactions) {
    if(!Array.isArray(transactions)){
        throw Error
    }
    else if (Array.isArray(transactions) && transactions.length<2){
        return [];
    }

    let inputObj= JSON.parse(JSON.stringify(transactions))
    // let baseDate= new Date(2019, 0, 1);

    mulipleTrans = inputObj.map((x,i)=>{
        return inputObj[i]['sourceAccount']+ inputObj[i]['targetAccount']+ inputObj[i]['amount'] + inputObj[i]['targetAccount'];
    });
    
    multipleTrans= multipleTrans.filter((x,i)=>{
        return (mulipleTrans.slice(0,i).includes(mulipleTrans[i]) || mulipleTrans.slice(i+1).includes(mulipleTrans[i]))
    })


    //duplicates have same source, target, category and amount
    //but different time and id
    // first group elements having same source and target and amount together

    //group these elements by 1min diffs


    
    return multipleTrans

}

export default findDuplicateTransactions;
