function classifier(input: []) {
    //for invalid inputs throw error
    if(!Array.isArray(input)){
        throw Error
    }
    //for empty array return {noOfGroups: 0}
    else if (Array.isArray(input) && !input.length){
        return {'noOfGroups': 0}
    }
    //copy input into another object so that the initial object is not mutated
    let baseDate: number= new Date(2019, 1, 1).getFullYear();
    let groupNo: number=0;

    
    interface membersObj{
        'name': string;
        'regNo': string;
        'age': number;
        'dob': string
    }
    interface group{
        'members': Array<membersObj>;
        'oldest': number;
        'sum': number;
        'regNos': Array<number>;
    }

    type resultObj= {
        [index: string]: any
    }
    let result: resultObj= {};

    
    //an array of the details we need from the input to enable easy navigation
    let arrayOfDetails:Array<membersObj> = input.map((x:membersObj)=> {
        return {'name':x.name, 'regNo': x.regNo, 'age': baseDate- (new Date(x.dob)).getFullYear(), 'dob':x.dob};
    })
    //sort arrayOfDetails by age
    arrayOfDetails= arrayOfDetails.sort((a,b)=> a.age -b.age);
    for (let i=0; i<arrayOfDetails.length; i++){
        // create new group if group doesnt exist yet or group length is already equals 3 or age is 5yrs older than youngest member
        if (!result['group'+groupNo] || result['group'+groupNo].members.length==3 || (arrayOfDetails[i].age - result['group'+groupNo]['members'][0]['age'])>5){
            groupNo++;
            result.noOfGroups = groupNo;
            result['group'+groupNo]= {
                members: [arrayOfDetails[i]],
                oldest: arrayOfDetails[i].age,
                sum: arrayOfDetails[i].age,
                regNos: [Number(arrayOfDetails[i].regNo)]
            }
        }
        //if age diff is less than 5 and members are not yet up to three add new member
        else if((arrayOfDetails[i].age - result['group'+groupNo]['members'][0]['age'])<=5 && result['group'+groupNo]['members'].length<3){
            result['group'+groupNo]['members'].push(arrayOfDetails[i]);
            result['group'+groupNo]['oldest']= arrayOfDetails[i].age;
            result['group'+groupNo]['sum']= result['group'+groupNo]['sum'] + arrayOfDetails[i].age;
            result['group'+groupNo]['regNos'].push(Number(arrayOfDetails[i].regNo));
            result['group'+groupNo]['regNos'].sort((a:number,b:number)=> a-b);
        }
    }
    return(result);
}
export default classifier;