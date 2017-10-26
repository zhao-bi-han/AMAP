# 路线规划---- 步行 公交 驾车
## 1、路径规划控件使用
* 步行导航 —— `AMap.Walking`
```
    map.plugin(['AMap.Walking'], function () {
            var walking = new AMap.Walking({
                map: map,
                panel: "panel" ,   // 结果列表在此容器展示
                showTraffic:true         // 显示交通状况
            })
            walking.search([
                { keyword: "保定学院", city: "保定" },    // 设置关键字
                { keyword: "东风公园", city: "保定" }
            ])
       })
```
* 公交换乘 —— `AMap.Transfer`
```
  map.plugin(['AMap.Transfer'], function () {
            var transfer = new AMap.Transfer({
                map: map,
                panel: "panel" ,   // 结果列表在此容器展示
                showTraffic:true         // 显示交通状况
            })
            transfer.search([
                { keyword: "保定学院", city: "保定" },
                { keyword: "火车站", city: "保定" }
            ])
            AMap.event.addListener(transfer, 'complete', function (e) {
                console.log(e);
            })
    
        })
```
* 驾车路线规划 —— `AMap.Driving`
```
     map.plugin(['AMap.Driving'], function () {
            var driving = new AMap.Driving({
                map: map,
                panel: "panel" ,   // 结果列表在此容器展示
                showTraffic:true         // 显示交通状况
            })
            driving.search([
                { keyword: "保定学院", city: "保定" },
                { keyword: "火车站", city: "保定" }
            ])
            AMap.event.addListener(driving, 'complete', function (e) {
                console.log(e);
            })
    
        })
```
## 2、实例核心代码（还未优化）
```
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
})
}
const obj={
    map: map,
    panel: "panel"    // 结果列表在此容器展示
}
```
## 3、效果图
![Image text](https://raw.githubusercontent.com/zhao-bi-han/AMAP/master/%E8%B7%AF%E5%BE%84%E8%A7%84%E5%88%92/showimg.GIF)
