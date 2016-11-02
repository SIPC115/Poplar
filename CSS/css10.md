CSS3 动画指南 - transform中的Matrix(矩阵)  
===  
利用transform的`translate,rotate,skew,scale`变换，配合animation我们可以实现大部分的动画效果，那么我们来思考一下
下面这个案例效果应该怎么实现：  
![](/image/css9-1.gif)  
"手机"在变换到"电脑"这一过程 涉及了长款的改变，这个效果貌似无法通过transform这几个属性简单的实现(实际上这个动画效果完全依靠css)；同样在之前我们说过
当前版本下transform是不能并发执行动画的，只能按顺序执行。那么为了解决这两个问题，我们介绍transform中的martix矩阵变换。  

# 前置知识  
## 矩阵  
由 m × n 个数aij排成的m行n列的数表称为m行n列的矩阵，简称m × n矩阵。记作：  
![](/image/css9-1.png)  
这m×n 个数称为矩阵A的元素，简称为元，数a<sub>ij</sub>位于矩阵A的第i行第j列，称为矩阵A的(i,j)元，
以数 a<sub>ij</sub>为(i,j)元的矩阵可记为(a<sub>ij</sub>)或(a<sub>ij</sub>)<sub>m × n</sub>，m×n矩阵A也记作A<sub>mn</sub>。
元素是实数的矩阵称为实矩阵，元素是复数的矩阵称为复矩阵。而行数与列数都等于n的矩阵称为n阶矩阵或n阶方阵 。  

## 矩阵的乘法运算 
两个矩阵的乘法仅当第一个矩阵A的列数和另一个矩阵B的行数相等时才能定义。
如A是m×n矩阵和B是n×p矩阵，它们的乘积C是一个m×p矩阵**C** = (c<sub>ij</sub>)，它的一个元素：  
![](/image/css9-2.png)  
并将此乘积记为: **C = AB**  
例如：  
![](/image/css9-3.png)    

## transform与坐标系统  
用过transform旋转的人可以发现了，其默认是绕着中心点旋转的，而这个中心点就是`transform-origin`属性对应的点，也是所有矩阵计算的一个重要依据点:  
![](/image/css9-6.png)    
当我们通过transform-origin属性进行设置的时候，矩阵相关计算也随之发生改变。    

# CSS3中的矩阵
CSS3中的矩阵指的是一个方法，书写为matrix()和matrix3d()，前者是元素2D平面的移动变换(transform)，
后者则是3D变换。2D变换为3 * 3矩阵，3D变换为 4 * 4矩阵。   
transform中的`translate`,`scale`,`skew`,`rotate`变换，在应用这些变换时都是通过martix矩阵变换计算出的。之所以通常我们
不用martix做变换，是因为这个属性不容易上手，但是它更加的强大。  
![](/image/css9-4.png)  

## CSS3 2D下矩阵变换  
CSS3中的2D矩阵matrix总共提供了六个参数:a,b,c,d,e和f，其基本写法如下：  

```css  
martix(a, b, c, d, e, f)  
```    
实际上，这六个参数，对应的矩阵就是：  
![](/image/css9-5.png)    
现在我们假设，x 和 y 是元素初始原点的坐标， x’ 和 y’ 则是通过矩阵变换后得到的新原点坐标。通过中间的那个3x3的变换矩阵，对原先的坐标施加变换，就能得到新的坐标了。
依据矩阵变换规则即可得到：x’ = ax + cy + e 和 y’ = bx + dy + f：  
![](/image/css9-8.png)  
我们来举个具体点的例子：    

```css  
transform: matrix(1,0,0,1,50,50);  /*a=1,b=0,c=0,d=1,e=50,f=50*/  
```  
现在，我们根据这个矩阵偏移元素的中心点，假设是(0,0)，即x=0，y=0。我们可以按照上面介绍的矩阵方式，将这个列成矩阵：  
![](/image/css9-8.png)  
变换后的原点位置x’和y’可以根据矩阵向量的计算规则计算出来即`x’=50，y’=50`。   
即元素的原点由(0,0)移动到(50,50)的位置。实际上`transform:matrix(1,0,0,1,50,50)`; 就等同时`transform: translate(50px,50px)`。  
接下来我们分别看看CSS3变形中matrix()和各变形函数之间的关系。  

### translate()转换成matrix()  
首先来看最简单的位移translate()函数。我们都知道transform:translate(tx,ty)的基本含义是将一个元素的显示位置平移tx,ty。在矩阵变形中，translate的matrix的参数为：  

```css  
transform: matrix(1,0,0,1,tx,ty);   /*tx,ty分别对应X和Y轴的增量*/  
```      
对应矩阵如下：  
![](/image/css9-9.png)  
所以平移只跟e，f参数有关，e表示水平增量；f表示垂直增量。  

### scale()装换成martix()  
transform:scale(sx,sy)将一个元素按指定的倍数进行缩放，它对应的矩阵是：    

```css  
transform: matrix(sx*x, 0, 0, sy*y, 0, 0); /*sx和sy分别对应X轴和Y轴的缩放比率*/ 
```    
对应矩阵如下：     
![](/image/css9-10.png)    
也就是matrix(sx, 0, 0, sy, 0, 0);，等同于scale(sx, sy);  

### rotate()转换成matrix()  
transform:rotate(θ)将一个元素按指定的角度旋转，它对应的矩阵是：  

```css  
transform: matrix(cos(θ),sin(θ),-sin(θ),cos(θ),0,0); /*cos(θ)和sin(θ)是指旋转度转*/  
```   
推导出的公式为：  
* x' = x * cosθ - y * sinθ + 0 = x * cosθ - y* sinθ
* y' = x * sinθ + y * cosθ + 0 = x * sinθ + y * cosθ  

对应矩阵如下：  
![](/image/css9-11.png)  

举个例子来说，如果我们想要`rotate(30deg)`效果，通过计算cos, sin值得出：   

```css  
transform: matrix(0.866025, 0.500000, -0.500000, 0.866025, 0, 0);  
```   

### skew()转换成matrix()  
transform:skew(ax,ay)将一个元素按指定的角度在X轴和Y轴倾斜，它对应的矩阵是：  

```css  
transform: matrix(1,tan(θy),tan(θx), 1, 0, 0);  /*tan(ax)和tan(ay)是对应的倾斜角度*/  
```   
推导出公式为：  
* x' = x + y * tan(θx) + 0 = x + y * tan(θx) 
* y' = x * tan(θy) + y + 0 = x * tan(θy) + y    

对应矩阵如下：  
![](/image/css9-13.png)    

对应于skew(θx + "deg"，θy+ "deg")这种写法。其中，θx表示x轴倾斜的角度，θy表示y轴，两者并无关联。  

上面所有的例子，总结下来就是  
![](/image/css9-12.png)  


### 利用martix实现镜像  
镜像对称在CSS3变形中没有相应的简化操作。只能通过矩阵matrix()来实现。  
。通过前面的内容介绍，我们清楚的知道，元素变形的原点是其中心点（在没有显式的重置之外），那么这个镜向的原点也不例外。因为该轴永远经过原点，因此，任意对称轴都可以用y=k*x直线表示。则matrix表示就是：  

```css
matrix((1 - k^2) / (1 + k^2), 2k / (1 + k^2), 2k / (1 + k^2), (k^2 - 1) / (1 + k^2), 0, 0)  
```   
看看这个是如何得出的：  
![](/image/css9-14.png)  
很简单，一是垂直，二是中心点在轴线上，因此有：    
```  
(y-y') / (x - x') = -1/ k     →       ky-ky' = -x+x'
(x + x') / 2 * k = y + y'     →       kx+kx' = y+y'
```   
把x’和y’提出来，就有：  

```  
x' = (1-k^2)/(k^2+1) *x + 2k/(k^2+1) *y;
y' = 2k/(k^2+1) *x + (k^2-1)/(k^2+1) *y;
```  
再结合矩阵公式：  

```  
x' = ax+cy+e;
y' = bx+dy+f;  
```  
我们可以得到martix矩阵的参数值：  

```  
a = (1-k^2)/(k^2+1);
b = 2k/(k^2+1);
c = 2k/(k^2+1);
d = (k^2-1)/(k^2+1);
```  
## CSS3 3D下矩阵变换 简单介绍   
有了2D矩阵matrix的基础后，再看3D矩阵matrix3d能稍微容易理解点, 3D用的是四阶矩阵如下：    
**translate3d(tx, ty, tz) 等价于 matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1)**   
![](/image/css9-15.png)  

**scale3d(sx,sy,sz) 等价于 matrix3d(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1)**  
![](/image/css9-16.png)  

**rotate3d(x,y,z,a)第四个参数alpha用于sc和sq中**  
![](/image/css9-17.png)  
这个的等价公式我是真不会了，没用过，大家慢慢带入martix自行运算吧，3D太难了。  
详细解读请看 [MDN martix3d](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function#matrix3d())  

# 附录  
参考资料如下：  
* [MDN transform-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function)   
* [Coordinate transformation matrices](http://www.mathamazement.com/Lessons/Pre-Calculus/08_Matrices-and-Determinants/coordinate-transformation-matrices.html)  
* [理解CSS3 transform中的Matrix(矩阵)](http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)













