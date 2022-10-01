function classifier(input) {
    if(!Array.isArray(input)){
        throw Error
    }
    else if (Array.isArray(input) && !input.length){
        return {'noOfGroups': 0}
    }
    //copy input into another object so that the initial object is preserved
    let inputObj= JSON.parse(JSON.stringify(input))
    let baseDate= new Date(2019, 0, 1);
    let agesArray= inputObj.map((x)=> {
        // if(x.regNo[0]=='0'){
        //     regNos= x.regNo.slice(1)
        // }
        
        return [x.name, x.regNo, Math.ceil((baseDate-new Date(x.dob))/(1000*60*60*24*365).toFixed(1)), x.dob,]
        
    })
    
    agesArray= agesArray.sort((a,b)=> a[2] -b[2]);
    // console.log(agesArray)
    // return agesArray;
    let count=0;
    let obj= {
    };
    for (let i=0; i<agesArray.length; i++){
        // TO DO I have to convert the agesArray to Concatenated Numbers for easy comparison
        if (!obj['group'+count] || obj['group'+count]['members'].length==3){
            count++
            obj.noOfGroups = count;
            // obj['group'+count]=[agesArray[i]]
            obj['group'+count]= {
                members: [
                    {name:agesArray[i][0], dob: agesArray[i][3], regNo: agesArray[i][1],age:agesArray[i][2]}
                ],
                oldest: agesArray[i][2],
                sum: agesArray[i][2],
                regNos: [Number(agesArray[i][1])]
            }
        }
        //if age diff is less than 5 and members are not yet up to three add new member
        else if((agesArray[i][2] - obj['group'+count]['members'][obj['group'+count]['members'].length-1]['age'])<=5 && obj['group'+count]['members'].length<=3){
            obj['group'+count]['members'].push({name:agesArray[i][0], dob: agesArray[i][3], regNo: agesArray[i][1], age:agesArray[i][2] });
            obj['group'+count]['oldest']= agesArray[i][2];
            obj['group'+count]['sum']= obj['group'+count]['sum'] + agesArray[i][2];
            obj['group'+count]['regNos'].push(Number(agesArray[i][1]))
            obj['group'+count]['regNos'].sort((a,b)=> a-b)
        }
        else if((agesArray[i][2] - obj['group'+count]['members'])>5 || obj['group'+count]['members'].length<=3){
            count++;
            obj.noOfGroups = count;
            obj['group'+count]= {
                members: [
                    {name:agesArray[i][0], dob: agesArray[i][3], regNo: agesArray[i][1], age: agesArray[i][2] }
                ],
                oldest: agesArray[i][2],
                sum: agesArray[i][2],
                regNos: [Number(agesArray[i][1])]
            }
        }
    }
    return(obj);
}


export default classifier;