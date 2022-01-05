---
layout: page
title: Maths
permalink: /maths/
---


Here are some of my favourite mathematical problems and some problems that I have set for BIMO:

## Problem 1

Let $k$ be a fixed positive integer and $f$ be a polynomial with integer coefficients such that $f(x) \neq 0$
for all $x \in \mathbb{Z}$. We know that
\\(f(x) \mid f(x + k)\\)
for all $x \in \mathbb{Z}$. Prove that $f$ is constant.

<details>
<summary> Click for Solution </summary> 
Assume $f(x) = a_nx^n + \cdots + a_0$ is nonconstant. Then there exists some $N \in \mathbb{R}$ such that $f|_{x\geq N}$ is injective. However, $\lim_{x\rightarrow \infty} \frac{f(x+h)}{f(x)}= \frac{a_n}{a_n} = 1$, and since $f(x) \mid f(x + k)$ for all integers $x$, there exists some $M\in \mathbb{R}$ such that $f(x+h)=f(x)$ for all integers $x\geq M$. This contradicts with injectivity.
</details>

## Burnside's Lemma ([_The Lemma that is not Burnside's_](https://en.wikipedia.org/wiki/Burnside%27s_lemma))

Let $G$ be any permutation group of $N=\\{1,\cdots,n\\}$. Let $f: N\rightarrow \\{1,\cdots,m\\}$ be a colouring of $N$ with $m$ colours. Two colourings $f_1$ and $f_2$ are said to be equivalent if $f_1=f_2 \circ g$ for some $g\in G$. The number of equivalence classes is $ \frac{1}{|G|}\sum_{g\in G} m^{C(g)}$
where $C(g)$ is the number of cycles in the cyclic decomposition of $g$.

<details>
<summary> Click for Solution </summary> 
Let $G$ act on the set $S= \{f_i\}$ of colourings by the rule $g(f) = f \circ g$. The number of colourings fixed by an element $g\in G$ is exactly $m^{C(g)}$ because for such colourings, every element of $\{1,\cdots,n\}$ situated in the same cycle of $g$ must have the same colour and elements situated in different cycles can freely have different colours. Therefore, using double counting, $\sum_{g\in G} m^{C(g)} = \sum_{f \in S} |\text{Stab}(f)|$. By the Orbit-Stabiliser theorem, $|\text{Stab}(f)| = \frac{|G|}{|O_f|} $ where $O_f$ is the orbit of $f$. In conclusion, the number of orbits in total is $\sum_{f\in S} \frac{1}{|O_f| = \sum_{f\in S} \frac{|\text{Stab}(f)}{|G|} = \frac{1}{|G|} \sum_{g\in G} m^{C(g)}}.
</details>