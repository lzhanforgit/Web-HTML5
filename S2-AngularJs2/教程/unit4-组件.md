### 一、生命周期


##### 1. 概述
每个组件都有一个被Angular管理的生命周期。

Angular创建它，渲染它，创建并渲染它的子组件，在它被绑定的属性发生变化时检查它，并在它从DOM中被移除前销毁它。

Angular提供了生命周期钩子，把这些关键生命时刻暴露出来，赋予我们在它们发生时采取行动的能力。

>每个接口都有唯一的一个钩子方法，它们的名字是由接口名再加上ng前缀构成的。比如，OnInit接口的钩子方法叫做ngOnInit， Angular在创建组件后立刻调用它.

##### 2. 生命周期的顺序

1. **ngOnChanges()**

    >当Angular（重新）设置数据绑定输入属性时响应。 该方法接受当前和上一属性值的SimpleChanges对象
    当被绑定的输入属性的值发生变化时调用，首次调用一定会发生在ngOnInit()之前。

2. **ngOnInit()**

    >在Angular第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。
    在第一轮ngOnChanges()完成之后调用，只调用一次。
3. ngDoCheck()

    >检测，并在发生Angular无法或不愿意自己检测的变化时作出反应。
在每个Angular变更检测周期中调用，ngOnChanges()和ngOnInit()之后。
4. **ngAfterContentInit()**

    >当把内容投影进组件之后调用。
    第一次ngDoCheck()之后调用，只调用一次。
    只适用于组件。
5. ngAfterContentChecked()

    >每次完成被投影组件内容的变更检测之后调用。
    ngAfterContentInit()和每次ngDoCheck()之后调用
    只适合组件。
6. **ngAfterViewInit()**

    >初始化完组件视图及其子视图之后调用。
第一次ngAfterContentChecked()之后调用，只调用一次。
只适合组件。
7. ngAfterViewChecked()
    一旦检测到该组件(或指令)的输入属性发生了变化，Angular就会调用它的ngOnChanges()方法。
    >每次做完组件视图和子视图的变更检测之后调用。
ngAfterViewInit()和每次ngAfterContentChecked()之后调用。
只适合组件。
8. ngOnDestroy
    >当Angular每次销毁指令/组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。
在Angular销毁指令/组件之前调用。
    
    ```
    import { Component,Input,Output,OnInit,OnChanges,AfterViewInit,EventEmitter } from '@angular/core';
    ...
    export class IndexComponent implements OnInit,OnChanges,AfterViewInit {
    ...
    
    ngOnChanges(){
        console.log('index-1------onchange');
      }
    
    ngOnInit(): void {
        console.log('index-2------oninit');
    
      }
    ngAfterViewInit(){
        console.log('index-3------ngAfterViewInit');
      }
    ```


### 二、 组件交互
参考博客：
[ Angular2父子组件之间数据传递：局部变量获取子组件](http://blog.csdn.net/long328583644/article/details/74894321)

[ Angular 2 组件之间如何通信](http://blog.csdn.net/qq_15096707/article/details/52859110)

1. 通过输入型绑定把数据从父组件传到子组件。

    ```
    //父指令
    <app-index [innerData]="mytext""></app-index>
    
    //子指令
    
    import { Component,Input } from '@angular/core';
    ...
    @Input() innerData:string;

    ```
2. 通过setter截听输入属性值的变化

    ```
    //子指令
    
    import { Component,Input } from '@angular/core';
    ...
    private _data='';
    
    @Input()
    set innerData(value: string) {
        this._data = (value && value.trim()) || '<no value set>';
    }

    get innerData(): string { return this._data; }

    ```
3. 通过ngOnChanges()来截听输入属性值的变化

    >当需要监视多个、交互式输入属性的时候，本方法比用属性的setter更合适。

    ```
    @Input() innerData:string;
    @Input() innerData2:string;
    //需要导入SimpleChange
    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    console.log('index-component-1------onchange');
    //** changes 为JSON对象
    //{innerData: SimpleChange, innerData2: SimpleChange}
    //innerData:
    //SimpleChange {previousValue: undefined, currentValue: "第一次的值", firstChange: true}
    //innerData2:
    //SimpleChange {previousValue: undefined, currentValue: "第一次的值", firstChange: true}
    //__proto__:Object}
    console.log(changes)
    
    console.log(changes.innerData)
    for(let key in changes){
       let ele=changes[key];
       console.log(ele.firstChange)
       if(ele.currentValue.trim().length==0){
         this.innerData='no text';
       }
    }
  }
    ```
    
    参考代码：
    
    ```
        ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        let log: string[] = [];
        for (let propName in changes) {
          let changedProp = changes[propName];
          let to = JSON.stringify(changedProp.currentValue);
          if (changedProp.isFirstChange()) {
            log.push(`Initial value of ${propName} set to ${to}`);
          } else {
            let from = JSON.stringify(changedProp.previousValue);
            log.push(`${propName} changed from ${from} to ${to}`);
          }
        }
        this.changeLog.push(log.join(', '));
      }
    ```
4. 父组件监听子组件的事件(子组件回传数据给父组件)

    ```
    //父组件-------------
    <div class="col-md-12 col-lg-12" style="background: grey">
      <app-child [sItem]="selItem" (update_data)="getChild($event)" ></app-child>
    </div>
    
    getChild(item){
        this.fromChild=item;
    }
    //ts文件
      childData:string;
      
    //html文件
      <h1 style="color: red">
          来自子元素的数据：{{childData}}
      </h1>
      
    //子组件-----------------------
    
    //ts文件 需要导入Output EventEmitter
    @Output() update_data:EventEmitter<number> = new EventEmitter();
    
    sendData(ev){
        this.update_data.emit(ev.target.value);
    }
    
    //html文件
    <div class="col-md-12 col-lg-12" style="color: red">
      <label for="toParent">向父元素传递的内容</label>
      <input type="text" id="toParent" (change)="sendData($event)">
    </div>
    ```
5. 父组件与子组件通过本地变量互动

    父组件不能使用数据绑定来读取子组件的属性或调用子组件的方法。但可以在父组件模板里，新建一个本地变量来代表子组件，然后利用这个变量来读取子组件的属性和调用子组件的方法
    
    这个本地变量方法是个简单便利的方法。但是它也有局限性，因为父组件-子组件的连接必须全部在父组件的模板中进行。父组件本身的代码对子组件没有访问权。

如果父组件的类需要读取子组件的属性值或调用子组件的方法，就不能使用本地变量方法。

6. 父组件调用@ViewChild()

    第一步导入ViewChild
    
    ```
    import { Component,ViewChild } from '@angular/core';

    ```
    第二步导入子组件
    
    
    ```
    import { InnerComponent } from './inner/inner.component';
    
    ```
    
    第三步构建子组件对象
    
    ```
    @ViewChild(InnerComponent)
    private inComponent: InnerComponent;
    ```
    
    第四步赋值
    
    ```
    addNumber(){
    this.num++;
    this.inComponent._number=this.num;
  }
    ```
    
    **注意**------------------------
    如果在父组件中给子组件属性初始化，必须等到子组件已经构建完毕，所以要在ngAfterViewInit（）事件中。
    

### 三、组件样式

1. 使用:host伪类选择器，用来选择组件宿主元素中的元素（相对于组件模板内部的元素）。

    >该选择器选择当前的组件，样式写在自己的CSS文件中
    
    :host(.css_name){}

    >该选择器选择当前的组件、同时有class=‘css_name’
    
    ```
    <!--在自己的CSS文件中-->
    :host(.inputcss){
          display: block;
          background: yellow;
    }

    <!--在父组件中-->
    <app-index  class="inputcss" [innerData]="mytext" [innerData2]="mytext" #child (update_data)="getData($event)"></app-index>
    ```
2. :host-context 选择器

    它在当前组件宿主元素的祖先节点中查找 CSS 类， 直到文档的根节点为止。
    但是最终只能选择自身组件中的元素。
   
``` 
<!--只有当某个祖先元素有 CSS 类theme-light时，我们才会把background-color样式应用到组件内部的所有<h2>元素中。-->

    :host-context(.theme-light) h2 {
    background-color: #eef;
}

```

### 四、动态组件



