import React, { use, useCallback, useEffect, useRef, useState } from "react";


function Pass(){

    const [length,setLenght]=useState('8');
    const [numAllow,setNumAllow]=useState(false);
    const [specailChar,setSpecialChar]=useState(false);
    const [pass,setPass]=useState('');

    const passwordGenerator= useCallback(()=>{
        let password="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllow){
        str +="1234567890"
    }
    if(specailChar){
        str +="!@#$%&*+-"
    }
    for(let i=1;i<=length;i++){
        let random = Math.ceil(Math.random() * str.length +1);
        password += str.charAt(random);
    }
    setPass(password)
    },[length],[numAllow],[specailChar],[pass])
  

    useEffect(()=>{
        passwordGenerator();
    },[length],[numAllow],[specailChar],[passwordGenerator])

   const copy =useRef(null);

   const copyToclip= useCallback(()=>{
    copy.current?.select();
    copy.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(pass);
    alert("password has been copied successfully")


   },[pass])

    return (
        <>
                <h1>PASSWORD GENERATOR</h1>
                <div id="main">
                <div className="box">
                    <div>
                    <input type="text" placeholder="YOUR RANDOM PASSWORD" className="text" value={pass} ref={copy} readOnly/>
                    <button onClick={copyToclip}>COPY</button>
                    </div>
                    <div className="range">
                      
                         <input type="range" min={8} max={20} id="range" value={length} 
                          onChange={(e)=>
                           setLenght(e.target.value)
                           }/>  <label htmlFor="range">length:{length}</label>
                        
                       <label htmlFor="check">
                         <input type="checkbox" defaultChecked={numAllow} id="check" onChange={()=>
                            {
                                setNumAllow((prevVal)=>!prevVal)

                            }}/> Numbers</label>
                       <label htmlFor="checks">
                         <input type="checkbox" id="checks" defaultChecked={specailChar} onChange={()=>{
                            setSpecialChar((prevVal)=>!prevVal)
                         }}/> Special char</label>
                    </div>
                </div>
                </div>
        
        </>
    );
}

export default Pass;