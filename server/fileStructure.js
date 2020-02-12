const fileStructure = ()=>{
    let serverFileStr = require('./serverFileStr.json')
    let arr = []
    function createFileStructure(path){
        if(!path.includes('.') && path !== '' && !arr.includes(path)){
            arr.push(path)
        }
        if(path.length <= 1){
        }
        else {
            let subPath = path.substring(0,path.lastIndexOf('/'))
            createFileStructure(subPath)
        }
    }
    
    let serverFileStrKeys = Object.keys(serverFileStr)
    for(let i = 0;i<serverFileStrKeys.length;i++){
        createFileStructure(serverFileStrKeys[i])
        if(i===serverFileStrKeys.length-1){
            let finalArr = arr.sort((a, b)=>{
                return a.length - b.length;
            })
            return finalArr
        }
    }
}
module.exports = fileStructure