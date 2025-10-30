---
layout: page
title: Problems I made
permalink: /maths/selfproblems
---

## Problem 1

Let $k$ be a fixed positive integer and $f$ be a polynomial with integer coefficients such that $f(x) \neq 0$
for all $x \in \mathbb{Z}$. We know that
\\(f(x) \mid f(x + k)\\)
for all $x \in \mathbb{Z}$. Prove that $f$ is constant.

<div class="boxed">
<details>
<summary> <span class="click">Click for Solution</span> </summary> 
Assume $f(x) = a_nx^n + \cdots + a_0$ is nonconstant. Then there exists some $N \in \mathbb{R}$ such that $f|_{x\geq N}$ is injective. However, $\lim_{x\rightarrow \infty} \frac{f(x+h)}{f(x)}= \frac{a_n}{a_n} = 1$, and since $f(x) \mid f(x + k)$ for all integers $x$, there exists some $M\in \mathbb{R}$ such that $f(x+h)=f(x)$ for all integers $x\geq M$. This contradicts with injectivity.
</details>
</div>