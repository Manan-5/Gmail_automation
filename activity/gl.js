let puppeteer = require("puppeteer");
let fs = require("fs");
let credFile1 = process.argv[2];
console.log("before");

(async function(){
       try{  
    let data  = await fs.promises.readFile(credFile1, "utf-8");
    let credentials = JSON.parse(data);
    login = credentials.login
    email = credentials.email;
    pwd = credentials.pwd;
    to = credentials.to;
    sub = credentials.sub;
    con = credentials.content;
    // img = credentials.img;
    // imgurl = credentials.imgurl;
    let emails = await fs.promises.readFile("id.json");
    let id=JSON.parse(emails);
    var i = 0;

    let browser= await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized","--incognito"]
        
    });
    // creates an empty page
    //  await browser.newPage();
    // returns array of currently open tab
    let numberOfPages = await browser.pages();
    let tab = numberOfPages[0];
    // let newtab = numberOfPages[1];
    await tab.goto(login,{
        waitUntil: "networkidle2",
    });
    await tab.waitForSelector("#identifierId");
    await tab.type("#identifierId", email, { delay: 200 }); 
    await tab.waitForSelector("#identifierNext");
    await tab.click("#identifierNext");
    await tab.waitFor(4000);
    await tab.waitForSelector(".bCAAsb",{delay:200});
    // await tab.click(".WEQkZc");
   await tab.type(".bCAAsb" , pwd, {delay:200 } );
   await tab.waitForSelector("#passwordNext");
    await tab.click("#passwordNext");
    console.log("signed in");
    await tab.waitForSelector(".z0");
    await tab.click(".z0" );
    // await tab.goto(`https://www.gmail.com//mail/u/0/#inbox?compose=new`, { waitUntil: "networkidle2" });
    
    
    // code below this is correct
    for(let key in id){
    await tab.waitForSelector(".bze");
    await tab.type(".bze" , id[key] , {delay: 400});
    await tab.keyboard.press( 'Enter');
     }
    await tab.keyboard.press( 'Tab');

    await tab.waitForSelector(".aoD.az6");
    await tab.click(".aoD.az6");
    await tab.type(".aoD.az6" , sub , {delay: 200});
    await tab.waitForSelector(".Ar.Au");
    await tab.click(".Ar.Au");
    await tab.type(".Ar.Au" , con , {delay: 200});

  
    await tab.waitForSelector(".dC");
    await tab.click(".dC");
    console.log("email is sent");
    
   
           
        await tab.waitFor(2500);

           await tab.waitForSelector(".n6 span[role=button]");

           await tab.click(".n6 span[role=button]")

           await tab.waitFor(1500);
        await tab.waitForSelector(".TN.bzz.aHS-bnv");
        console.log("spam folder");
        await tab.click(".TN.bzz.aHS-bnv");
        await tab.waitFor(2000);
        await tab.waitForSelector(".ya span[role=button]");
        await tab.click(".ya span[role=button]");
        
        await tab.waitFor(1000);
        
        await tab.waitForSelector(".J-at1-auR.J-at1-atl");
        await tab.click(".J-at1-auR.J-at1-atl");
        console.log("spam is deleted");
        
        
        await tab.waitFor(1000);
    await tab.waitForSelector(".gb_D.gb_Ra.gb_i");
    await tab.click(".gb_D.gb_Ra.gb_i");
    // gb_Jb gb_lg gb_tg gb_5e gb_5c
    console.log("waiting for sign out btn");
    await tab.waitFor(2000);
    await tab.waitForSelector(".gb_Jb.gb_lg.gb_tg.gb_5e.gb_5c");
    await tab.click(".gb_Jb.gb_lg.gb_tg.gb_5e.gb_5c");
    console.log("signed out");
    
}catch(err){
    console.log(err);
}
     
})()
