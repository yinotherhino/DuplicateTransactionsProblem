function classifier(input) {
    if (input=[]){
        return {'noOfGroups': 0}
    }
    else if(!Array.isArray(input)){
        throw "Input should be an array"
    }
    //copy input into another object so that the initial object is preserved
    let inputObj= JSON.parse(JSON.stringify(input))
    //use a count variable to name the groups when a group is formed count ++ and group name = 'group'+count

    let agesArray= inputObj.map((x) => Number(x.dob.slice(0,10)));
    agesArray= agesArray.sort((a,b)=> Number(a.slice(0,4) + a.slice(5,7) + a.slice(8,10)) -Number(b.slice(0,4)  + b.slice(5,7) + b.slice(8,10)));
    // console.log(agesArray)
    let count=1;
    let obj= {};
    for (let i=0; i<agesArray.length; i++){
        // TO DO I have to convert the agesArray to Concatenated Numbers for easy comparison
        if (!obj['group'+count]){
            obj['group'+count]=[agesArray[i]]
        }
        else if((agesArray[i]-obj['group'+count][0])<=50000){
            obj['group'+count].push(agesArray[i]);
        }
        else if((agesArray[i]-obj['group'+count][0])>50000){
            count++;
            obj['group'+count]=[agesArray[i]]

        }
    }
    //input is an array of objects that will be accessed with a for loop

    // dob= slice the dob property at index 9 to cut out the time


    //sort by age and group into categories including ages in the same 5 year range

    //

}


export default classifier;
