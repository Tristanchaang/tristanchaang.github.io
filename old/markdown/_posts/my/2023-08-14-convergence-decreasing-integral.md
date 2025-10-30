---
layout: post
font: Times New Roman
title: Penumpuan Kamiran Fungsi Sinus Berturun
---

Let $f$ be a continuous decreasing function on $(0,\infty)$ such that $\displaystyle \lim_{x\rightarrow \infty} f(x) = 0$. Then

$$\begin{aligned}
    \int_1^\infty f(x) \sin x \ dx
\end{aligned}$$

is convergent. 

## Corollaries

- $\displaystyle \int_c^\infty f(x) \sin (ax+b) \ dx$ is convergent
- $\displaystyle \int_1^\infty \frac{\cos (x-1/4)}{\sqrt{x}} \ dx$ is convergent (I will use this in a future topic)

## Proof

For all positive integers $n$, let

$$\begin{align}
    I_n &= \int_1^{2n\pi} f(x) \sin x \ dx\\
    J_n &= \int_1^{(2n+1)\pi} f(x) \sin x \ dx\\
\end{align}$$

Note that

$$\begin{aligned}
    I_{n+1} - I_n &= \int_{2n\pi}^{(2n+2)\pi} f(x) \sin x \ dx\\
    &= \int_{2n\pi}^{(2n+1)\pi} f(x) \sin x \ dx + \int_{(2n+1)\pi}^{(2n+2)\pi} f(x) \sin x \ dx\\
    &= \int_{2n\pi}^{(2n+1)\pi} f(x) \sin x \ dx + \int_{2n\pi}^{(2n+1)\pi} f(x+\pi) \sin (x+\pi) \ dx\\
    &= \int_{2n\pi}^{(2n+1)\pi} \left(f(x)-f(x+\pi)\right) \sin x \ dx \geq 0\\
    J_{n+1} - J_n &= \int_{(2n+1)\pi}^{(2n+3)\pi} f(x) \sin x \ dx\\
    &= \int_{(2n+1)\pi}^{(2n+2)\pi} f(x) \sin x \ dx + \int_{(2n+2)\pi}^{(2n+3)\pi} f(x) \sin x \ dx\\
    &= \int_{(2n+1)\pi}^{(2n+2)\pi} f(x) \sin x \ dx + \int_{(2n+1)\pi}^{(2n+2)\pi} f(x+\pi) \sin (x+\pi) \ dx\\
    &= \int_{(2n+1)\pi}^{(2n+2)\pi} \left(f(x)-f(x+\pi)\right) \sin x \ dx \leq 0\\
    J_n - I_n &= \int_{2n\pi}^{(2n+1)\pi} f(x) \sin x \ dx \geq 0
\end{aligned}$$

and thus $I_1\leq I_2 \leq \cdots$ and $J_1 \geq J_2 \geq \cdots$. Since $I_n \leq J_n \leq J_1$, the monotone convergent theorem says that $I_n$ converges to some limit $L$. Similarly $J_n$ converges to some limit $L'$. 

$$\begin{aligned}
    \lim_{n\rightarrow \infty} |J_n-I_n| \leq \int_{2n\pi}^{(2n+1)\pi} f(x) |\sin x| \ dx \leq \pi \cdot \max_{[2n\pi,\infty)} f(x) \rightarrow 0
\end{aligned}$$

so $L=L'$. Let $t>1$.

- If $2n\pi \leq t < (2n+1)\pi$, then $I_n \leq \displaystyle \int_1^tf(x)\sin x \ dx \leq J_n$.
- If $(2n+1)\pi \leq t < (2n+2)\pi$, then $I_{n+1} \leq \displaystyle \int_1^tf(x)\sin x \ dx \leq J_n$.

By the squeeze theorem, the integral converges to $L$.
