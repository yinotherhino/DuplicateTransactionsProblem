function findDuplicateTransactions(transactions) {
    if(!Array.isArray(transactions)){
        throw Error;
    }
    else if (Array.isArray(transactions) && transactions.length<2){
        return [];
    }
    let resultObj= {}
    //copy the input into another object to avoid mutation
    let inputObj= JSON.parse(JSON.stringify(transactions))
    inputObj.sort((a,b) =>{
        a= new Date(a.time).getTime();
        b= new Date(b.time).getTime();
        return a - b;
    })
    let multipleTrans = inputObj.map((x,i)=>{
        return inputObj[i]['sourceAccount']+ inputObj[i]['targetAccount']+ inputObj[i]['amount'] + inputObj[i]['category'];
    });
    //filter out single transactions
    multipleTrans= multipleTrans.filter((x,i)=>{
        return (multipleTrans.slice(i+1).includes(multipleTrans[i]));
    })

    let duplicateTransactions= Array.from(new Set(multipleTrans))
    duplicateTransactions.forEach((x) => {
        resultObj[x]=[]
    })

    inputObj.forEach((x,i)=>{
        let concatenatedVars= inputObj[i]['sourceAccount']+ inputObj[i]['targetAccount']+ inputObj[i]['amount'] + inputObj[i]['category'];
        if(!resultObj[concatenatedVars]){
         return
        }
        resultObj[concatenatedVars].push(inputObj[i])
    })

    let arrays= Object.keys(resultObj);
    let result=[];
    for (let i=0; i<arrays.length; i++){
        result.push(resultObj[arrays[i]])
    }
    
    //remove transactions that are more than 1min apart
    for (let i=0; i<result.length; i++){
        for (let j=1; j<result[i].length; j++){
            let timeOfLastTransaction= new Date (result[i][j-1]['time']).getTime();
            let timeOfTransaction= new Date (result[i][j]['time']).getTime();
            if((timeOfTransaction- timeOfLastTransaction)>60000){
                result.push(result[i].slice(j));
                result[i]= result[i].slice(0,j)
            }
        }
    }
    result= result.filter(x=> x.length>1)
    //sort the final result based on the time of the first transaction
    return result.sort((a,b)=> {
        a= new Date(a[0]['time'])
        b= new Date(b[0]['time'])
        return a-b
    })

}

export default findDuplicateTransactions;
