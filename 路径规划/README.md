# 路线规划---- 步行 公交 驾车
## 1、路径规划组件使用
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
## 2、实例核心代码
```
// 路径查询
searchEle.onclick = () => {
    panelEle.innerHTML = null;
     new PathPlan({
        startVal: startEle.value,  // 获取input框的值
        endVal: endEle.value,
        way:way,
        cityName:cityName
    })
}


function PathPlan(options) {
    this.opts = Object.assign({}, PathPlan.defaluts,options)
    this.obj = {
        map: map,
        panel: "panel"    // 结果列表在此容器展示
    }
    this.init();
}
// 设置默认参数
PathPlan.defaluts = {
    cityName: "保定市",
    way: "Walking",
    startVal: null,
    endVal: null,
}

PathPlan.prototype.init = function() {
  let  startVal=this.opts.startVal;
  let  endVal=this.opts.endVal;
    if (startVal != '' && endVal != '') {
        map.clearMap();    // 清除路线 
        this.query(this.opts.way, this.opts.cityName, startVal,endVal);
    }
}
PathPlan.prototype.query =function (ways, cityName, start, end){
    map.plugin([`AMap.${ways}`], () => {
        let w;
        if (ways == "Walking") {   // 判断是 步行、驾车、公交
            w = new AMap.Walking(this.obj)
        } else if (ways == "Transfer") {
            w = new AMap.Transfer(this.obj)
        } else {
            w = new AMap.Driving(this.obj)
        }
        w.search([
            { keyword: start, city: cityName },
            { keyword: end, city: cityName }
        ])
    })
}
```
## 3、效果图
![Image text](https://raw.githubusercontent.com/zhao-bi-han/AMAP/master/%E8%B7%AF%E5%BE%84%E8%A7%84%E5%88%92/showimg.GIF)
