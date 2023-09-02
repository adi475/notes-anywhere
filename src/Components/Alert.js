import React from "react";

function Alert(props) {

  const capitalise = (word) =>{
    if(word==="danger"){
      word="error"
    }
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}

return (
// we use 'And' logic here to resolve the problem of null initial value of alert state
<div className='my-1' style={{height:"35px"}}>{ props.alert && <div className={`alert alert-${props.alert.typ} alert-dismissible fade show`} role="alert">
<strong>{capitalise(props.alert.typ)}</strong>:{props.alert.msg}
</div>}</div>


)
}

export default Alert;
