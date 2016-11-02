CSS3 动画指南 - transform中的Matrix(矩阵)  
===  
利用transform的`translate,rotate,skew,scale`变换，配合animation我们可以实现大部分的动画效果，那么我们来思考一下
下面这个案例效果应该怎么实现：  
![](/image/css9-1.gif)  
"手机"在变换到"电脑"这一过程 涉及了长款的改变，这个效果貌似无法通过transform这几个属性简单的实现(实际上这个动画效果完全依靠css)；同样在之前我们说过
当前版本下transform是不能并发执行动画的，只能按顺序执行。那么为了解决这两个问题，我们介绍transform中的矩阵变换。  

# 前置知识  
## 矩阵  
由 m × n 个数aij排成的m行n列的数表称为m行n列的矩阵，简称m × n矩阵。记作：  
![](/image/css9-1.png)  
这m×n 个数称为矩阵A的元素，简称为元，数a<sub>ij</sub>位于矩阵A的第i行第j列，称为矩阵A的(i,j)元，
以数 aij为(i,j)元的矩阵可记为(a<sub>ij</sub>)或(a<sub>ij</sub>)<sub>m × n</sub>，m×n矩阵A也记作A<sub>mn</sub>。
元素是实数的矩阵称为实矩阵，元素是复数的矩阵称为复矩阵。而行数与列数都等于n的矩阵称为n阶矩阵或n阶方阵 。