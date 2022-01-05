---
layout: page
title: Favourite Problems
permalink: /maths/favproblems
---

## General Solution for Linear Recursion

Suppose $a_n = c_{k-1}a_{n-1}+c_{k-2}a_{n-2}+\cdots + c_{0}a_{n-k}$ be a recursive relation of $a_i$ with constants $c_1,\cdots,c_k$. We define the _characteristic polynomial_ of this relation as $f(x) = x^k - c_{k-1}x^{k-1}- c_{k-2}x^{k-2} - \cdots - c_0$. If the factored form of $f(x)$ is $f(x) = \prod (x-r_i)^{m_i}$ where $r_i$ are distinct roots, then the general solution for $a_n$ is

<p align=center> $a_n = \sum_{i} (C_{i,0} + nC_{i,1} + \cdots + n^{m_i-1} C_{i,m_i-1}) r_i^n$. </p>

where $C_{i,j}$ are all constants determined by the initial terms of the recursion.

<details>
<summary> Click for Solution </summary> 
Let $v_n=[a_n,a_{n-1},\cdots,a_{n-k+1}]$ for each $n\in \mathbb{Z}$. Note that if $M$ is the matrix
<p align=center>
$\begin{bmatrix}
c_{k-1} & 1 & 0 & \cdots & 0\\
c_{k-2} & 0 & 1 & \cdots & 0\\
c_{k-3} & 0 & 0 & \cdots & 0\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
c_0 & 0 & 0 & \cdots & 0
\end{bmatrix}$
</p>
then $v_nM = v_{n+1}$ and thus $v_n = v_0 M^n$. It is easy to verify that $\text{det}(xI-M)=f(x)$ via induction by expanding the last row. Write $M=P^{-1} J P$ in Jordan Form. Hence $v_n = v_0P^{-1}J^n P$. Recall that $J^n$ is made up of $n$-th powers of Jordan blocks, whose entries are all in the form $r_i {n-j} \binom{n}{j}$ etc. $\binom{n}{j}$ is just a polynomial in $n$. Expanded out, the first entry $a_n$ of $v_n$ definitely has the form as stated in the problem.
</details>

## Burnside's Lemma ([_The Lemma that is not Burnside's_](https://en.wikipedia.org/wiki/Burnside%27s_lemma))

Let $G$ be any permutation group of $N=\\{1,\cdots,n\\}$. Let $f: N\rightarrow \\{1,\cdots,m\\}$ be a colouring of $N$ with $m$ colours. Two colourings $f_1$ and $f_2$ are said to be equivalent if $f_1=f_2 \circ g$ for some $g\in G$. The number of equivalence classes is $ \frac{1}{|G|}\sum_{g\in G} m^{C(g)}$
where $C(g)$ is the number of cycles in the cyclic decomposition of $g$.

<details>
<summary> Click for Solution </summary> 
Let $G$ act on the set $S= \{f_i\}$ of colourings by the rule $g(f) = f \circ g$. The number of colourings fixed by an element $g\in G$ is exactly $m^{C(g)}$ because for such colourings, every element of $\{1,\cdots,n\}$ situated in the same cycle of $g$ must have the same colour and elements situated in different cycles can freely have different colours. Therefore, using double counting, $\sum_{g\in G} m^{C(g)} = \sum_{f \in S} |\text{Stab}(f)|$. By the Orbit-Stabiliser theorem, $|\text{Stab}(f)| = \frac{|G|}{|O_f|} $ where $O_f$ is the orbit of $f$. In conclusion, the number of orbits in total is $\sum_{f\in S} \frac{1}{|O_f|} = \sum_{f\in S} \frac{|\text{Stab}(f)|}{|G|} = \frac{1}{|G|} \sum_{g\in G} m^{C(g)}$.
</details>