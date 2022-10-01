function classifier(input) {
    //for invalid inputs throw error
    if(!Array.isArray(input)){
        throw Error
    }
    //for empty array return {noOfGroups: 0}
    else if (Array.isArray(input) && !input.length){
        return {'noOfGroups': 0}
    }
    //copy input into another object so that the initial object is not mutated
    let inputObj= JSON.parse(JSON.stringify(input));
    //assume current date is 2019
    let baseDate= new Date(2019, 1, 1).getFullYear();
    let groupNo=0;
    let result= {};
    //an array of the details we need from the input to enable easy navigation
    let arrayOfDetails= inputObj.map((x)=> {
        return [x.name, x.regNo, baseDate- (new Date(x.dob)).getFullYear(), x.dob]
    })
    //sort arrayOfDetails by age which is at the second index of each element
    arrayOfDetails= arrayOfDetails.sort((a,b)=> a[2] -b[2]);

    for (let i=0; i<arrayOfDetails.length; i++){
        // create new group if group doesnt exist yet or group length is already equals 3
        if (!result['group'+groupNo] || result['group'+groupNo]['members'].length==3){
            groupNo++
            result.noOfGroups = groupNo;
            result['group'+groupNo]= {
                members: [
                    {name:arrayOfDetails[i][0], dob: arrayOfDetails[i][3], regNo: arrayOfDetails[i][1],age:arrayOfDetails[i][2]}
                ],
                oldest: arrayOfDetails[i][2],
                sum: arrayOfDetails[i][2],
                regNos: [Number(arrayOfDetails[i][1])]
            }
        }
        //if age diff is less than 5 and members are not yet up to three add new member
        else if((arrayOfDetails[i][2] - result['group'+groupNo]['members'][result['group'+groupNo]['members'].length-1]['age'])<=5 && result['group'+groupNo]['members'].length<=3){
            result['group'+groupNo]['members'].push({name:arrayOfDetails[i][0], dob: arrayOfDetails[i][3], regNo: arrayOfDetails[i][1], age:arrayOfDetails[i][2] });
            result['group'+groupNo]['oldest']= arrayOfDetails[i][2];
            result['group'+groupNo]['sum']= result['group'+groupNo]['sum'] + arrayOfDetails[i][2];
            result['group'+groupNo]['regNos'].push(Number(arrayOfDetails[i][1]))
            result['group'+groupNo]['regNos'].sort((a,b)=> a-b)
        }
        //if age difference between last member and new prospective member is more than 5 create new group
        else if((arrayOfDetails[i][2] - result['group'+groupNo]['members'])>5 || result['group'+groupNo]['members'].length<=3){
            groupNo++;
            result.noOfGroups = groupNo;
            result['group'+groupNo]= {
                members: [
                    {name:arrayOfDetails[i][0], dob: arrayOfDetails[i][3], regNo: arrayOfDetails[i][1], age: arrayOfDetails[i][2] }
                ],
                oldest: arrayOfDetails[i][2],
                sum: arrayOfDetails[i][2],
                regNos: [Number(arrayOfDetails[i][1])]
            }
        }
    }
    return(result);
}


export default classifier;