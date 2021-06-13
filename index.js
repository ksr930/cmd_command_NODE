const fs= require('fs');
const { type } = require('os');
const path= require('path')

const types=require('./fileTypes.js');



const input=process.argv.slice(2);
const dir=input[1]
switch(input[0])
{
   case "tree":
      treePrint(dir)
      break;
   case "organized":
      organizedfn(dir)
      break;
   case "help":
     helpfn()
      break;
   default:
      console.log("wrong command")

}

function treePrint(dir)
{
   
       let a=fs.lstatSync(dir);
     
       if(a.isFile())
       {
           console.log("  ---->"+path.basename(dir));
          
       }
       else{
          console.log("==>"+path.basename(dir))
           let b=fs.readdirSync(dir);
           b.forEach(d=>{
              treePrint(path.join(dir,d))
           })
       }
     

}

function helpfn()
{
    console.log(`
       node index.js tree dirpath
       node index.js organized dirpath
       node index.js help
   `)
}

function category(f)
{let b=path.extname(f);
  b= b.slice(1);
   
 
   for(let type in types)
   {
     let a= types[type]
     for(var i=0;i<a.length;i++)
     {
        if(a[i]==b)
        return type;
     }
   }
   return "others"
}

function organizedfn(dir)
{
   fs.mkdirSync("allSorted");
   fs.mkdirSync("allSorted/media");
   
   fs.mkdirSync("allSorted/document");
   
   fs.mkdirSync("allSorted/image");

   let filecontent=fs.readdirSync(dir);

   filecontent.forEach(f=>{

      let ty= category(f);
    
     console.log(ty);
   //   console.log(path.join(allsorted,ty))
    fs.copyFileSync((dir+'/'+f),("allSorted"+'/'+ty))



   })


}
