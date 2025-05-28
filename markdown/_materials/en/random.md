---
layout: page
font: Times New Roman
title: Random Fun Problems
---

### BIMO Junior Proposal

Let $k$ be a fixed positive integer and $f$ be a polynomial with integer coefficients such that $f(x) \neq 0$ and $f(x) \mid f(x + k)$ for all $x \in \mathbb{Z}$. Prove that $f$ is constant.

<div class="boxed">
<details>
<summary> <span class="click">Click for Solution</span> </summary> 
Assume $f(x) = a_nx^n + \cdots + a_0$ is nonconstant. Then there exists some $N \in \mathbb{R}$ such that $f|\_{x\geq N}$ is injective. However, $\lim_{x\rightarrow \infty} \frac{f(x+h)}{f(x)}= \frac{a_n}{a_n} = 1$, and since $f(x) \mid f(x + k)$ for all integers $x$, there exists some $M\in \mathbb{R}$ such that $f(x+h)=f(x)$ for all integers $x\geq M$. This contradicts with injectivity.
</details>
</div>

<hr/>

### Electric Field Above Uniformly Charged Square Plate

(Source: <emph>Introduction to Electrodynamics</emph> by Griffiths, Chapter 2) Find the electric field at a height $z$ above the center of a square sheet (side $s$) carrying a uniform surface charge $\sigma$.

<div class="boxed">
<details>
<summary> <span class="click">Click for Solution</span> </summary>
<b>Answer:</b> $\frac{\sigma}{2\varepsilon_0}\left[\frac{4}{\pi}\arctan\left(\sqrt{1+s^2/2z^2}\right)-1\right]$
<hr/>
<b>Proof:</b>

  $$\begin{aligned}\int_0^\frac{\pi}{4}\frac{d\theta}{\sqrt{k^2+\sec^2\theta}} &= \int_0^\frac{\pi}{4}\frac{\cos\theta \ d\theta}{\sqrt{k^2\cos^2\theta+1}}\\
    &= \int_0^{1/\sqrt{2}}\frac{du}{\sqrt{k^2(1-u^2)+1}}\\
    &= \frac{1}{k}\int_0^{1/\sqrt{2}}\frac{du}{\sqrt{(1+k^{-2} - u^2)}}\\
    &= \frac{1}{k}\arcsin\left(\frac{1/\sqrt{2}}{\sqrt{1+k^{-2}}}\right)\\
    &= \frac{1}{k}\arctan\left(\frac{k}{\sqrt{k^2+2}}\right)\end{aligned}$$
Let $\triangle$ be the triangle with vertices $(0,0),(1,0),(1,1)$.
  $$\begin{aligned}f(k) & = \int_{-1}^1 \int_{-1}^1 \frac{dx \ dy}{(k^2+x^2+y^2)^{3/2}}\\
    &= 8\iint_{\triangle} \frac{dx \ dy}{(k^2+x^2+y^2)^{3/2}}\\
    &= 8\int_0^{\frac{\pi}{4}} \int_{0}^{\sec\theta} \frac{r \ dr \ d\theta}{(k^2+r^2)^{3/2}}\\
    &= 4\int_0^{\frac{\pi}{4}} \left[\int_{0}^{\sec\theta} \frac{d(k^2+r^2)}{(k^2+r^2)^{3/2}}\right]  d\theta\\
    &= 8\int_0^{\frac{\pi}{4}} \left[\frac{1}{k} - \frac{1}{\sqrt{k^2+\sec^2\theta}}\right] d\theta\\
    &= \frac{2\pi}{k} - \frac{8}{k}\arctan\left(\frac{k}{\sqrt{k^2+2}}\right)\end{aligned}$$
Find the electric field at a height $z$ above the center of a square sheet (side $s$) carrying a uniform surface charge $\sigma$.
  $$\begin{aligned}V(z) &= \frac{1}{4\pi \varepsilon_0} \int_{S} \frac{dq}{r} = \frac{\sigma}{4\pi \varepsilon_0}  \int_S \frac{dx \ dy}{\sqrt{z^2+x^2+y^2}}\\
    E(z) = - \frac{\partial V}{\partial z} &= \frac{\sigma}{4\pi \varepsilon_0} \int_{-s/2}^{s/2}\int_{-s/2}^{s/2} \frac{z\ dx \ dy}{(z^2+x^2+y^2)^{3/2}}\\
    &= \frac{\sigma z}{2\pi \varepsilon_0 s} \int_{-s/2}^{s/2}\int_{-s/2}^{s/2} \frac{d(2x/s) \ d(2y/s)}{((2z/s)^2+(2x/s)^2+(2y/s)^2)^{3/2}}\\
    &= \frac{\sigma z}{2\pi \varepsilon_0 s} f(2z/s)\\
    &= \frac{\sigma}{2\varepsilon_0}\left[1 - \frac{4}{\pi}\arctan\left(\frac{z}{\sqrt{z^2+s^2/2}}\right)\right]\\
    &= \frac{\sigma}{2\varepsilon_0}\left[\frac{4}{\pi}\arctan\left(\sqrt{1+s^2/2z^2}\right)-1\right]\end{aligned}$$
</details>
</div>

<hr/>

### General Solution for Linear Recursion

Suppose $a_n = c_{k-1}a_{n-1}+c_{k-2}a_{n-2}+\cdots + c_{0}a_{n-k}$ is a recursive relation of $a_i$ with constants $c_1,\cdots,c_{k-1}$. We define the _characteristic polynomial_ of this relation as $f(x) = x^k - c_{k-1}x^{k-1}- c_{k-2}x^{k-2} - \cdots - c_0$. If the factored form of $f(x)$ is $f(x) = \prod _i (x-\lambda _i)^{m_i}$ where $\lambda _i$ are distinct roots, then the general solution for $a_n$ is

<p align=center> $a_n = \sum_{i} (C_{i,0} + nC_{i,1} + \cdots + n^{m_i-1} C_{i,m_i-1}) \lambda _i^n$. </p>

where $C_{i,j}$ are all constants determined by the initial terms of the recursion.

<div class="boxed">
<details>
<summary> <span class="click">Click for Proof</span> </summary> 
Let $\vec{v_n}=[a_n,a_{n-1},\cdots,a_{n-k+1}]$ for each $n\in \mathbb{Z}$. Note that if $M$ is the matrix
<p align=center>
$\begin{bmatrix}
c_{k-1} & 1 & 0 & \cdots & 0\\
c_{k-2} & 0 & 1 & \cdots & 0\\
c_{k-3} & 0 & 0 & \cdots & 0\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
c_0 & 0 & 0 & \cdots & 0
\end{bmatrix}$
</p>
then $\vec{v_n}M = \vec{v_{n+1}}$ and thus $\vec{v_n} = \vec{v_0} M^n$. It is easy to verify that $\text{det}(xI-M)=f(x)$ via induction by expanding the last row. Write $M=P^{-1} J P$ in Jordan Form. Hence $\vec{v_n} = \vec{v_0}P^{-1}J^n P$. Recall that $J^n$ is made up of $n$-th powers of Jordan blocks, whose entries are all in the form $\lambda _i^{n-j} \binom{n}{j}$ etc. $\binom{n}{j}$ is just a polynomial in $n$. Expanded out, the first entry $a_n$ of $\vec{v_n}$ definitely has the form as stated in the problem.
</details>
</div>

<hr/>

### General Solution for Homogeneous Differential Equation

Suppose $y^{(n)} = c_{n-1}y^{(n-1)} + c_{n-2}y^{(n-2)} + \cdots + c_0 y$ is an ordinary differential equation of $y(t)$ with constants $c_1,\cdots,c_{n-1}$. We define the _characteristic polynomial_ of this ODE as $f(x) = x^k - c_{n-1}x^{n-1}- c_{n-2}x^{n-2} - \cdots - c_0$. If the factored form of $f(x)$ is $f(x) = \prod _i (x-\lambda _i)^{m_i}$ where $\lambda _i$ are distinct roots, then the general solution for $y$ is

<p align=center> $y(t) = \sum_{i} (C_{i,0} + tC_{i,1} + \cdots + t^{m_i-1} C_{i,m_i-1}) e^{\lambda _it}$. </p>

where $C_{i,j}$ are all constants.

<div class="boxed">
<details>
<summary> <span class="click">Click for Proof</span> </summary> 
We proceed like the previous problem. Let $\vec{v}=[y^{(n-1)},y^{(n-2)},\cdots,y]$ for each $n\in \mathbb{Z}$. Note that if $M$ is the matrix
<p align=center>
$\begin{bmatrix}
c_{n-1} & 1 & 0 & \cdots & 0\\
c_{n-2} & 0 & 1 & \cdots & 0\\
c_{n-3} & 0 & 0 & \cdots & 0\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
c_0 & 0 & 0 & \cdots & 0
\end{bmatrix}$
</p>
then $\vec{v}M = \frac{d\vec{v}}{dt}$. Using the useful property of matrix exponentials, $\vec{v}=\vec{v_0}e^{tM}$ for some constant $\vec{v_0}$. Write $M$ as the Jordan form and proceed as the previous problem.
</details>
</div>

<hr/>

### Burnside's Lemma ([_The Lemma that is not Burnside's_](https://en.wikipedia.org/wiki/Burnside%27s_lemma))

Let $G$ be any permutation group of $N=\\{1,\cdots,n\\}$. Let $f: N\rightarrow \\{1,\cdots,m\\}$ be a colouring of $N$ with $m$ colours. Two colourings $f_1$ and $f_2$ are said to be equivalent if $f_1=f_2 \circ g$ for some $g\in G$. The number of equivalence classes is $ \frac{1}{|G|}\sum_{g\in G} m^{C(g)}$
where $C(g)$ is the number of cycles in the cyclic decomposition of $g$.

<div class="boxed">
<details>
<summary> <span class="click">Click for Proof</span> </summary> 
Let $G$ act on the set $S= \{f_i\}$ of colourings by the rule $g(f) = f \circ g$. The number of colourings fixed by an element $g\in G$ is exactly $m^{C(g)}$ because for such colourings, every element of $\{1,\cdots,n\}$ situated in the same cycle of $g$ must have the same colour and elements situated in different cycles can freely have different colours. Therefore, using double counting, $\sum_{g\in G} m^{C(g)} = \sum_{f \in S} |\text{Stab}(f)|$. By the Orbit-Stabiliser theorem, $|\text{Stab}(f)| = \frac{|G|}{|O_f|} $ where $O_f$ is the orbit of $f$. In conclusion, the number of orbits in total is $\sum_{f\in S} \frac{1}{|O_f|} = \sum_{f\in S} \frac{|\text{Stab}(f)|}{|G|} = \frac{1}{|G|} \sum_{g\in G} m^{C(g)}$.
</details>
</div>
