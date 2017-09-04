### 一. 数据显示

##### 1. 使用插值表达式显示组件属性


```
template: `
  <h1>{{title}}</h1>
  <h2>My favorite hero is: {{myHero}}</h2>
  `
```
JavaScript 中那些具有或可能引发副作用的表达式是被禁止的，包括：

* 赋值 (=, +=, -=, ...)
* new运算符
* 使用;或,的链式表达式
* 自增或自减操作符 (++和--)

>模板是包在 ECMAScript 2015 反引号 (`) 中的一个多行字符串。 反引号 (`) — 注意，不是单引号 (') — 允许把一个字符串写在多行上， 使 HTML 模板更容易阅读。

**注意，我们没有调用 new 来创建AppComponent类的实例，是 Angular 替我们创建了它。**


```
export class AppCtorComponent {
  title: string;
  myHero: string;

  constructor() {
    this.title = 'Tour of Heroes';
    this.myHero = 'Windstorm';
  }
}
```

##### 2.使用ngFor显示数组属性

```
template: `
  <h1>{{title}}</h1>
  <h2>My favorite hero is: {{myHero}}</h2>
  <p>Heroes:</p>
  <ul>
    <li *ngFor="let hero of heroes">
      {{ hero }}
    </li>
  </ul>
`
```

>ngFor用于显示一个“数组”， 但ngFor可以为任何可迭代的 (iterable) 对象重复渲染条目。

##### 4. 使用NgForOf显示数组属性
* index: number: The index of the current item in the iterable.
* count: number: 
* first: boolean: True when the item is the first item in the iterable.
* last: boolean: True when the item is the last item in the iterable.
* even: boolean: True when the item has an even index in the iterable.
* odd: boolean: True when the item has an odd index in the iterable.

```
<li *ngFor="let user of userObservable | async as users; index as i; first as isFirst">
   {{i}}/{{users.length}}. {{user}} <span *ngIf="isFirst">default</span>
</li>
```


##### 3. 通过 NgIf 进行条件显示


```
<p *ngIf="heroes.length > 3">There are many heroes!</p>
```
>Angular 并不是在显示和隐藏这条消息，它是在从 DOM 中添加和移除这个段落元素。 这会提高性能，特别是在一些大的项目中有条件地包含或排除一大堆带着很多数据绑定的 HTML 时。

**ngIf指令通常会用来防范空指针错误。**

##### 4. ngSwitch

```
<container-element [ngSwitch]="switch_expression">
  <some-element *ngSwitchCase="match_expression_1">...</some-element>
  <some-element *ngSwitchCase="match_expression_2">...</some-element>
  <some-other-element *ngSwitchCase="match_expression_3">...</some-other-element>
  <ng-container *ngSwitchCase="match_expression_3">
    <!-- use a ng-container to group multiple root nodes -->
    <inner-element></inner-element>
    <inner-other-element></inner-other-element>
  </ng-container>
  <some-element *ngSwitchDefault>...</some-element>
</container-element>
```

### 二. 模板


##### 1. 插值表达式

```
<h3>
  {{title}}
  <img src="{{heroImageUrl}}" style="height:30px">
  
  //或者
  
  <img [src]="heroImageUrl" style="height:30px">
</h3>
```
>Angular 对所有双花括号中的表达式求值，把求值的结果转换成字符串，并把它们跟相邻的字符串字面量连接起来。最后，把这个组合出来的插值结果赋给元素或指令的属性。

##### 2. 模板表达式，表达式上下文

表达式的上下文可以包括组件之外的对象。 比如模板输入变量 (let hero)和模板引用变量(#heroInput)就是备选的上下文对象之一。


```
<div *ngFor="let hero of heroes">{{hero.name}}</div>
<input #heroInput> {{heroInput.value}}
```

>表达式中的上下文变量是由模板变量、指令的上下文变量（如果有）和组件的成员叠加而成的。 如果我们要引用的变量名存在于一个以上的命名空间中，那么，模板变量是最优先的，其次是指令的上下文变量，最后是组件的成员。

##### 3. 模板语句

模板语句用来响应由绑定目标（如 HTML 元素、组件或指令）触发的事件。 模板语句将在事件绑定一节看到，它出现在=号右侧的引号中，就像这样：(event)="statement"。

语句上下文可以引用模板自身上下文中的属性。 在下面的例子中，就把模板的$event对象、模板输入变量 (let hero)和模板引用变量 (#heroForm)传给了组件中的一个事件处理器方法。

```
<button (click)="onSave($event)">Save</button>
<button *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{hero.name}}</button>
<form #heroForm (ngSubmit)="onSubmit(heroForm)"> 
</form>

```

##### 4. 数据绑定


| 数据方向 | 语法 | 绑定类型 |
| --- | --- | --- |
| 单向：从数据源到视图目标 | {{expression}} [target]="expression"bind-target="expression"| 插值表达式 Property Attribute 类 样式 |
|单向：从视图目标 到数据源|(target)="statement"ontarget="statement"|事件|
|双向|[(target)]="expression"bindon-target="expression"|双向

>HTML attribute 与 DOM property 的对比
要想理解 Angular 绑定如何工作，重点是搞清 HTML attribute 和 DOM property 之间的区别。

>attribute 是由 HTML 定义的。property 是由 DOM (Document Object Model) 定义的。

>少量 HTML attribute 和 property 之间有着 1:1 的映射，如id。
有些 HTML attribute 没有对应的 property，如colspan。
有些 DOM property 没有对应的 attribute，如textContent。
大量 HTML attribute看起来映射到了property…… 但却不像我们想的那样！
最后一类尤其让人困惑…… 除非我们能理解这个普遍原则：

>attribute 初始化 DOM property，然后它们的任务就完成了。property 的值可以改变；attribute 的值不能改变。

>例如，当浏览器渲染<input type="text" value="Bob">时，它将创建相应 DOM 节点， 其value property 被初始化为 “Bob”。

>当用户在输入框中输入 “Sally” 时，DOM 元素的value property 变成了 “Sally”。 但是这个 HTML value attribute 保持不变。如果我们读取 input 元素的 attribute，就会发现确实没变： input.getAttribute('value') // 返回 "Bob"。

>HTML attribute value指定了初始值；DOM value property 是当前值。

>disabled attribute 是另一个古怪的例子。按钮的disabled property 是false，因为默认情况下按钮是可用的。 当我们添加disabled attribute 时，只要它出现了按钮的disabled property 就初始化为true，于是按钮就被禁用了。

>添加或删除disabled attribute会禁用或启用这个按钮。但 attribute 的值无关紧要，这就是我们为什么没法通过 <button disabled="false">仍被禁用</button>这种写法来启用按钮。

>设置按钮的disabled property（如，通过 Angular 绑定）可以禁用或启用这个按钮。 这就是 property 的价值。

>就算名字相同，HTML attribute 和 DOM property 也不是同一样东西。

**模板绑定是通过 property 和事件来工作的，而不是 attribute。**



##### 5. 属性绑定 ( [属性名] )

```
<img [src]="heroImageUrl">

<button [disabled]="isUnchanged">Cancel is disabled</button>

<div [ngClass]="classes">[ngClass] binding to the classes property</div>

<goods-detail [goods]="currentGood"></goods-detail>

```

样式绑定

1. class

    ```
    <p class="bg-red" [class]="'div-css'">
    ```
    这个时候div-css 会完全覆盖bg-red的样式。
    
    ```
        newcss='div-css';
    
        <p class="bg-red" [class]="newcss">
    
    ```
    这个时候newcss属性部位空时， 会完全覆盖bg-red的样式。
    
    ```
        <div [class.cssName]="expression">The class binding is special</div>
    ```
    
    当想要同时添加或移除多个 CSS 类时，NgClass指令可能是更好的选择。

    ```
        <div [ngClass]="{'special': isSpecial}"></div>
        //多个样式选择
        this.currentClasses =  {
        'saveable': this.canSave,
        'modified': !this.isUnchanged,
        'special':  this.isSpecial
        };
        <div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special</div>
    ```
2. style

    ```
    <button [style.color]="isSpecial ? 'red': 'green'">Red</button>
<button [style.background-color]="canSave ? 'cyan': 'grey'" >Save</button>
<button [style.font-size.em]="isSpecial ? 3 : 1" >Big</button>
<button [style.font-size.%]="!isSpecial ? 150 : 50" >Small</button>
    ```
    
    如果要同时设置多个内联样式，NgStyle指令可能是更好的选择。
    
    ```
    this.currentStyles = {
        'font-style':  this.canSave      ? 'italic' : 'normal',
        'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
        'font-size':   this.isSpecial    ? '24px'   : '12px'
      };
      
      <div [ngStyle]="currentStyles"></div>
    ```
3. NgModel 

    在使用ngModel指令进行双向数据绑定之前，我们必须导入FormsModule并把它添加到Angular模块的imports列表中。
    
         ```
        import { FormsModule } from '@angular/forms';           ```
    
#### 6.模板引用变量 ( #var )

模板引用变量通常用来引用模板中的某个DOM元素，它还可以引用Angular组件或指令或Web Component。

可以通过模板引用变量 调用子组件内部的方法。

```
<button id="btn01" #btn (click)="show(btn)">click...</button>

<h1>{{btn.id}}</h1>
```
**模板引用变量的作用范围是整个模板。 不要在同一个模板中多次定义同一个变量名，否则它在运行期间的值是无法确定的。**

#### 7. 模板表达式操作符---安全导航操作符 ( ?. ) 和空属性路径

用NgIf代码环绕它来解决这个问题。

```
<div *ngIf="nullHero">The null hero's name is {{nullHero.name}}</div>
```

或者可以尝试通过&&来把属性路径的各部分串起来，让它在遇到第一个空值的时候，就返回空。

```
The null hero's name is {{nullHero && nullHero.name}}
```

Angular 安全导航操作符 (?.) 是在属性路径中保护空值的更加流畅、便利的方式。 表达式会在它遇到第一个空值的时候跳出。 显示是空的，但应用正常工作，而没有发生错误。

```
The null hero's name is {{nullHero?.name}}
```

    


