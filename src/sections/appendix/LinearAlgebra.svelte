<script>
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
</script>

<Heading level=2 refId=linearAlgebra>
    Linear algebra
    <span slot=context>Select results and definitions from linear algebra, which come up in our discussions of linear and integer programming.</span>
</Heading>

Linear algebra is the study of math involving matrices, vectors, and linear transformations. A <Definition refId=matrix>
    matrix
    <span slot=definition>A rectangular array of numbers.</span>
</Definition> (the basic object of linear algebra) is a rectangular array of numbers. We denote the size of the matrix as $$m\times n$$ where $$m$$ is the number of rows and $$n$$ is the number of columns. For example,

<MathDisp>
    A=\begin{bmatrix} 2 & 4 \\ 7 & 0 \\ 6 & 3 \end{bmatrix}
</MathDisp>

is a $$3\times 2$$ matrix. A matrix is said to be <Definition refId=squareMatrix>
  square
  <span slot=definition>A <DefinitionRef refId=matrix/> with the number of rows is equal to the number of columns.</span>
  <span slot=glossaryDisp>square matrix</span>
</Definition> if it has the same number of rows and columns.

<Heading level=3 refId=matrixMath>
  Matrix math
  <span slot=context>Elementary operations over matrices.</span>
</Heading>

We say Matrices $$A$$, $$B$$ are equal if <em>all</em> of their elements are equal. First off, that means $$A$$ and $$B$$ must have the same number of rows $$m$$ and columns $$n$$. Additionally, if we notate the entries of the matrices like:

<MathDisp>
  A = \begin{bmatrix}
  a_{11} & a_{12} & \cdots & a_{1n} \\
  a_{21} & a_{22} & \cdots & a_{2n} \\
  \vdots & \vdots & \ddots & \vdots \\
  a_{m1} & a_{m2} & \cdots & a_{mn} \\
  \end{bmatrix}
</MathDisp>

and

<MathDisp>
  B = \begin{bmatrix}
  b_{11} & b_{12} & \cdots & b_{1n} \\
  b_{21} & b_{22} & \cdots & b_{2n} \\
  \vdots & \vdots & \ddots & \vdots \\
  b_{m1} & b_{m2} & \cdots & b_{mn} \\
  \end{bmatrix}
</MathDisp>

Then we say $$A=B\ $$ if and only if $$\ a_{11}=b_{11}$$, $$a_{12}=b_{12}$$, ... and so on.

Addition is only defined for two matrices of the same size. For two $$m\times n$$ matrices $$A$$ and $$B$$, we have

<MathDisp>
  A + B = \begin{bmatrix}
a_{11} + b_{11} & a_{12} + b_{12} & \cdots & a_{1n} + b_{1n} \\
a_{21} + a_{21} & a_{22} + a_{22} & \cdots & a_{2n} + a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} + a_{m1} & a_{m2} + a_{m2} & \cdots & a_{mn} + a_{mn} \\
\end{bmatrix}
</MathDisp>

Multiplication $$AB$$ is only defined when the the second dimension of $$A$$ equals the first dimension of $$B$$. So, if $$A$$ is an $$m\times n$$ matrix (for some $$m, n$$), we need $$B$$ to be an $$n\times s$$ matrix (for some $$s$$). In this case, we define their product as the matrix $$C$$ having entries

<MathDisp>
  c_{ij} = \sum_{k=1}^n a_{ik}b_{kj}.
</MathDisp>

Here is a small example to see it in action:

<MathDisp>
  \begin{align*}
  \begin{bmatrix}0&1\\2&3\\4&5\end{bmatrix}
  \begin{bmatrix}6&7\\8&9\end{bmatrix}
  &=
\begin{bmatrix}
0\cdot6 + 1\cdot8 & 0\cdot7 + 1\cdot9 \\
2\cdot6 + 3\cdot8 & 2\cdot7 + 3\cdot9 \\
4\cdot6 + 5\cdot8 & 4\cdot7 + 5\cdot9 \\
\end{bmatrix}\\
&=
\begin{bmatrix}8&9\\36&41\\64&73\end{bmatrix}
\end{align*}
</MathDisp>

There is a simpler form of multiplication available between a matrix $$A\in\R^{m\times n}$$ and a scalar (a single number) $$s\in\R$$, where each element of the product is simply the corresponding element of $$A$$ multiplied by $$s$$:

<MathDisp>
  sA = \begin{bmatrix}
sa_{11} & sa_{12} & \cdots & sa_{1n} \\
sa_{21} & sa_{22} & \cdots & sa_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
sa_{m1} & sa_{m2} & \cdots & sa_{mn} \\
\end{bmatrix}
</MathDisp>

Matrix addition and multiplication satisfy the following properties:

- Associativity of addition:<MathDisp>(A + B) + C = A + (B + C)</MathDisp>
- Associativity of multiplication:<MathDisp>A(BC) = (AB)C</MathDisp>
- Commutativity of addition:<MathDisp>A + B = B + A</MathDisp>
- Distributivity:<MathDisp>A(B + C) = AB + AC</MathDisp>

You may notice that multiplication does not commute, i.e. $$AB \neq BA$$. Indeed, in the general case where $$A\in\R^{m\times n}$$ and $$B\in\R^{n\times s}$$, the product $$BA$$ is not even defined if $$m\neq s$$. Even if $$m=s$$ and the product is defined, the result needs not be the same.

An <Definition refId=identityMatrix>
  identity matrix
  <span slot=definition>A <DefinitionRef refId=squareMatrix/> with 1s along the diagonal and 0s everywhere else, typically denoted as $$\identity$$. An important property is that $$A\identity=A$$ for any matrix $$A$$ (and $$\identity$$ properly sized).</span>
</Definition>, denoted by $$\identity$$, is a square vector whose elements are all 0s expect for 1s along the diagonal, i.e.

<MathDisp>
  \identity = \begin{bmatrix}
1 & 0 & \cdots & 0 \\
0 & 1 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 1 \\
\end{bmatrix}
</MathDisp>

The main property of identity matrices is that multiplying another (properly sized) matrix by $$\identity$$ does not alter it, i.e. we have

<MathDisp>
  \identity A = A,\quad A\identity= A.
</MathDisp>

Note that we usually don't explicitly specify the size of $$\identity$$, since it is usually clear from the context.

The <Definition refId=zeroMatrix>
  zero matrix
  <span slot=definition>A matrix with every entry equal to 0.</span>
</Definition>, denoted by $$\zeros$$ is a matrix with all entries equal to 0. Again, we will usually not explicitly specify its size since it will be clear from context. The zero matrix satisfies:

<MathDisp>
  A + \zeros = A,\quad \zeros A = \zeros,\quad A\zeros = A.
</MathDisp>

Note that $$\identity$$ and $$\zeros$$ play roles in matrix operations similar to the roles of 1 and 0 (respectively) in arithmetic.

<Heading refId=systemsOfEquations level=3>
  Systems of equations
</Heading>

Matrices are great for concisely stating systems of linear equations, linear equations in some set of variables you'd like to hold true simultaneously. For example, the set of equations

<MathDisp>
2x_1 + 3x_2 = 7\\
5x_1 - 4x_2 = 6
</MathDisp>

can alternatively be stated as:

<MathDisp>
\begin{bmatrix}
2 & 3 \\
5 & -4
\end{bmatrix}
\begin{bmatrix}
x_1 \\ x_2
\end{bmatrix}
=
\begin{bmatrix}
7 \\ 6
\end{bmatrix}
</MathDisp>

There are certain elementary operations one can perform on a system of linear equations that don't have an effect on the solution of the system. I'll state these operations in terms of rows, but similar operations exist for columns as well:

- Interchange two rows:
  <MathDisp>
  \begin{bmatrix}
  2 & 3 \\
  5 & -4
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  7 \\ 6
  \end{bmatrix}
  \Leftrightarrow
  \begin{bmatrix}
  5 & -4 \\
  2 & 3
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  6 \\ 7
  \end{bmatrix}
  </MathDisp>
- Multiply a row by a non-zero number, e.g. multiplying the top row by two:
  <MathDisp>
  \begin{bmatrix}
  2 & 3 \\
  5 & -4
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  7 \\ 6
  \end{bmatrix}
  \Leftrightarrow
  \begin{bmatrix}
  4 & 6 \\
  5 & -4
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  14 \\ 6
  \end{bmatrix}
  </MathDisp>
- Adding a multiple of one row to another row, e.g. multiplying the first row by 2 and adding it to the second:
  <MathDisp>
  \begin{bmatrix}
  2 & 3 \\
  5 & -4
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  7 \\ 6
  \end{bmatrix}
  \Leftrightarrow
  \begin{bmatrix}
  2 & 3 \\
  9 & 2
  \end{bmatrix}
  \begin{bmatrix}
  x_1 \\ x_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  7 \\ 20
  \end{bmatrix}
  </MathDisp>

<!--
### Rank and inverse

A set of vectors $$\x_1, \x_2, \dots, \x_m$$ is said to be **linearly dependent** if there exists $$m$$ numbers $$c_1, c_2, \dots, c_m$$, some of which are not zeros, such that

<MathDisp>
c_1\x_1 + c_2\x_2 + \cdots + c_m\x_m = \zeros.
</MathDisp>

Otherwise, the vectors are said to be **linearly independent**. For example, the vectors

<MathDisp>
\x_1 = [1, 1, 1],\quad \x_2 = [0, 1, 1],\quad \x_3 = [2, 5, 5],
</MathDisp>

if we take $$c_1 = 2$$, $$c_2 = 3$$, and $$c_3 = -1$$ then we have

<MathDisp>
\begin{align*}
2\x_1 + 3\x_2 - x_3 & = [2, 2, 2] + [0, 3, 3] - [2, 5, 5]\\
                    & = [0, 0, 0]
\end{align*}
</MathDisp>

so the vectors are linearly dependent.

The **rank** of a set of vectors is the largest number of linearly independent vectors that can be chosen from the space. So e.g. the rank of $$\{\x_1, \x_2, \x_3\}$$ from above is 2.

Matrices also have a notion of rank. The **row rank** of a matrix is the rank of its set of row vectors, while the **column rank** of the matrix is the rank of its set of column vectors. An important result in linear algebra is that, for any matrix, the row rank and column rank are the same. Thus we can talk about the **rank** of a matrix, being equal to either the row rank or the column rank.

Suppose $$A$$ is an $$n\times n$$ (square) matrix. We say $$A$$ is **non-singular** if it has rank $$n$$. Otherwise, if the rank is less than $$n$$, we way it is **singular**. Importantly, if $$A$$ is non-singular, there is a unique non-singular matrix $$A\inv$$ such that

<MathDisp>
AA\inv = \identity = A\invA.
</MathDisp>

We call the matrix $$A\inv$$ the **inverse** of $$A$$. Singular matrices do not have inverses.

 
-->