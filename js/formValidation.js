let divEle= document.createElement('div')
function inValidStyle(ele,errorMsg ){
    ele.style.borderColor="red"
    // divEle.innerHTML=''
    // divEle.style.color='red'
    // divEle.style.paddingTop='5px'
    // divEle.innerHTML=` ${errorMsg}`
    // ele.after(divEle)
    let nextEle=ele.nextElementSibling;
    nextEle.style.color='red'
    nextEle.innerHTML=` ${errorMsg}`
    nextEle.style.paddingTop='5px'
}

function validStyle(ele){
    ele.style.borderColor="#EEEEEE";
    let nextEle=ele.nextElementSibling;
    nextEle.style.color='#28A745'
    nextEle.innerText="Looks good!"

    nextEle.style.paddingTop='5px'
}
function userNameValid(ele){
    return ele.value.length==0 || ele.value.trim() =="" || ele.value.trim().length<2 || ! isNaN(ele.value)
}
function emailvalid(ele){
    return ele.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
}
function passValid(passEle){
    return passEle.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
}
function comparePass(ele1,ele2){
    if(passValid(ele1) && passValid(ele2)){
        return ele1.value === ele2.value
    }
}
function phoneValid(ele){
    return ele.value.match(/^(010|011|015)\d{8}$/)
}
function placeValidate(ele){
    return ele.value.length==0 || ele.value.trim() =="" || ele.value.trim().length<3 || ! isNaN(ele.value)

}
function placeNumValidate(ele){
    return ele.value.length!=0 && ele.value.trim() !="" && ele.value.trim().length>=1 &&  !isNaN(ele.value) && ele.value !=0

}
function postalCode(ele){
    return ele.value.match(/^[0-9]{5}$/)
}
function validMsg(ele){
    return ele.value.length==0 || ele.value.trim() =="" || ele.value.trim().length<2 || ! isNaN(ele.value)

}
