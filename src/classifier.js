function findDuplicateTransactions(transactions) {
    if(!Array.isArray(transactions)){
        throw Error;
    }
    else if (Array.isArray(transactions) && transactions.length<2){
        return [];
    }
    let resultObj= {}
    let inputObj= JSON.parse(JSON.stringify(transactions))
    inputObj.sort((a,b) =>{
        a= new Date(a.time).getTime();
        b= new Date(b.time).getTime();
        return a - b;
    })
    let multipleTrans = inputObj.map((x,i)=>{
        return inputObj[i]['sourceAccount']+ inputObj[i]['targetAccount']+ inputObj[i]['amount'] + inputObj[i]['targetAccount']+ inputObj[i]['category'];
    });
    multipleTrans= multipleTrans.filter((x,i)=>{
        return (multipleTrans.slice(0,i).includes(multipleTrans[i]) || multipleTrans.slice(i+1).includes(multipleTrans[i]))
    })

    let duplicateTransactions= Array.from(new Set(multipleTrans))
    duplicateTransactions.forEach((x) => {
        resultObj[x]=[]
    })

    inputObj.forEach((x,i)=>{
        let concat= inputObj[i]['sourceAccount']+ inputObj[i]['targetAccount']+ inputObj[i]['amount'] + inputObj[i]['targetAccount']+ inputObj[i]['category'];
        // let timeOfTransaction= new Date (inputObj[i]['time']).getTime();
        if(!resultObj[concat]){
         return
        }
        // else if(resultObj[concat] && resultObj[concat].length==0){
        else if(resultObj[concat] ){ 
            resultObj[concat].push(inputObj[i])
        }
        // else if(resultObj[concat] && resultObj[concat].length>0 ){ 
        //     let timeOfLastTransaction= new Date (resultObj[concat][resultObj[concat].length-1]['time']).getTime();
        //     if (resultObj[concat] && (timeOfTransaction - timeOfLastTransaction)<= 60000){
        //     resultObj[concat].push(inputObj[i]);
        // }}
    })

    let arrays= Object.keys(resultObj);
    let result=[];
    for (let i=0; i<arrays.length; i++){
        result.push(resultObj[arrays[i]])
    }
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
    
    return result

}


export default classifier;