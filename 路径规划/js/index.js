// 初始化
let panelEle = document.getElementById('panel');
let startEle = document.getElementById('start');
let endEle = document.getElementById('end');
let searchEle = document.getElementById('search');
let wayEle = document.getElementById('way');
let aEle = wayEle.getElementsByTagName('a');
let way;


// 创建地图 及获取当前城市
    let map = new AMap.Map('container', {
        zoom: 12
    });
    map.getCity((data) => {
        cityName = data['city'];
    });


// 方式选择
wayEle.onclick = (e) => {
    for (let i = 0; n = aEle.length, i < n; i++) {
        aEle[i].setAttribute('class', '');
    }
    var target = e.target || e.srcElement;
    if (target.nodeName.toLowerCase() == 'a') {
        target.setAttribute('class', 'active');
        way = target.getAttribute('item');    // 获取方式

    }
}

// 路径查询
searchEle.onclick = () => {
    panelEle.innerHTML = null;
     new PathPlan({
        startVal: startEle.value,  // 获取input框的值
        endVal: endEle.value,
        way:way
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