// 初始化
let panelEle=document.getElementById('panel');
let startEle=document.getElementById('start');
let endEle=document.getElementById('end');
let searchEle=document.getElementById('search');
let wayEle=document.getElementById('way');
let aEle=wayEle.getElementsByTagName('a');
let cityName="保定市";
let way="Walking";

let map = new AMap.Map('container', {
    zoom: 12
});
// 获取当前城市
window.onload=()=>{
    map.getCity((data)=>{
        cityName=data['city'] ;
    });
}

// 方式选择
wayEle.onclick=(e)=>{
    for(let i=0;n=aEle.length,i<n;i++){
          aEle[i].setAttribute('class','');
    }
var target=e.target || e.srcElement;
if(target.nodeName.toLowerCase()=='a'){
    target.setAttribute('class','active');
    way=target.getAttribute('item');

 }
}
    
// 添加事件
searchEle.onclick=()=>{
     panelEle.innerHTML=null;
    let startVal=startEle.value;   // 获取input框的值
    let endVal=endEle.value;
    if(startVal!=''&&endVal!=''){  
        map.clearMap();    // 清除路线 
        query(way,startVal, endVal);
    }
}

const query=(ways,start,end)=>{
    map.plugin([`AMap.${ways}`], ()=>{              
    var w;
    if(ways=="Walking"){   // 判断是 步行、驾车、公交
        w = new AMap.Walking(obj)
    }else if(ways=="Transfer"){
        w = new AMap.Transfer(obj)
    }else{
        w = new AMap.Driving(obj)
    }
    w.search([
        { keyword: start,city:cityName},
        { keyword: end ,city:cityName}
    ])
    // AMap.event.addListener(w, 'complete', function (e) {
    //     console.log(e);
    // })

})
}

const obj={
    map: map,
    panel: "panel"    // 结果列表在此容器展示
}