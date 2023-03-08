const createPath = (firstUser, secondUser) => {
    if(firstUser === 'all')
          return firstUser; 
    else{
        let array = [firstUser, secondUser].sort();
        return array[0] + array[1];
    }
}

export default createPath