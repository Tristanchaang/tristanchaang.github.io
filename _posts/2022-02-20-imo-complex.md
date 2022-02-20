---
layout: post
title: "Solving an IMO Shortlist Problem using Complex Analysis!"
---

The sequence of real numbers $a_0, a_1,\cdots$ is defined by
\begin{align*}
    a_0 = -1, \qquad \sum_{k=0}^n \frac{a_{n-k}}{k+1} = 0\text{ for $n\geq 1$.}
\end{align*}
Show that $a_n>0$ for all $n\geq 1$.\\ \\
Define $\DS F(x) = \sum_{n\geq 0} a_nx^n$. The given conditions imply $\DS F(x) \cdot \sum_{n \geq 0} \frac{x^n}{n+1} = -1$, but
\begin{align*}
    \sum_{n\geq 0} \frac{x^n}{n+1} &= \frac{1}{x} \int_{0}^x \sum_{n\geq 0} X^{n}\ dX = -\frac{\ln(1-x)}{x},\\
    \therefore F(x) &= \frac{x}{\ln(1-x)}.
\end{align*}
We are left to find $a_n=\DS \frac{F^{(n)}(0)}{n!}$. By definition of residue, $\DS \frac{F^{(n)}(0)}{n!} = \text{Res} \pr{\frac{F(x)}{x^{n+1}},0}$.
Let $\DS f(z) = \frac{F(z)}{z^{n+1}} = \frac{1}{z^n \ln(1-z)}$ be a complex function where $\ln$ is the complex logarithm. The arguments are in the range $[-\pi,\pi)$. Therefore the branch cut of $f$ is where $1-z \leq 0 \ (z\in \mathbb{R})$. Apply an anticlockwise keyhole integral around the point $z=1$:
\\ \\
\begin{minipage}{0.5\textwidth}
\begin{align*}
    2\pi ia_n&= 2\pi i\text{Res} \pr{\frac{F(x)}{x^{n+1}},0}\\
    &= \oint f(z) \ dz\\
    &=\int_\Gamma + \int_\gamma + \int_{C_1} + \int_{C_2} 
\end{align*}
\end{minipage}
\begin{minipage}{0.5\textwidth}
    \centering
    \begin{tikzpicture}
    \begin{axis}[
      no markers, domain=-5:5, samples=100,
      axis x line=center, axis y line=center, 
      xlabel=$\text{Re}$, ylabel=$\text{Im}$,
      xlabel style={anchor=west}, ylabel style={anchor=south},
      height=6cm, width=6cm,
      xtick=\empty, ytick=\empty,
      enlargelimits=false, clip=false, axis on top,
      grid = major,
      xmin=-5, xmax=5,
      ymin=-5, ymax=5
      ]
      %\addplot [fill=cyan!20, draw=none, domain=0:5.96] {gauss(6.5,1)} \closedcycle;
      %\addplot [very thick,cyan!50!black] {gauss(4,1)};
      \draw (axis cs:1.2,0.2) -- (axis cs:4.5,0.2);
      \draw (axis cs:1.2,-0.2) -- (axis cs:4.5,-0.2);
      \fill (axis cs:1,0) circle (15);
      \fill (axis cs:0,0) circle (15);
      \draw (axis cs:1.2,0.2) arc (45:315:28.3);
      \draw (axis cs:4.5,0.2) arc (2.5448: 357.4552 : 450.444225);
      \draw (axis cs: 2.8,0) node[anchor=south] {$C_1$};
      \draw (axis cs: 2.8,0) node[anchor=north] {$C_2$};
      \draw (axis cs: -3.4,3.4) node[anchor=north west] {$\Gamma$};
      \draw (axis cs: 0.8, -0.2) -- (axis cs: -0.5, -1.5);
      \draw (axis cs: -0.2, -1.2) node[anchor= north east] {$\gamma$};
    %\draw [yshift=-0.6cm, latex-latex](axis cs:4,0) -- node [fill=white] {$1.96\sigma$} (axis cs:5.96,0);
    \end{axis}
    \end{tikzpicture}
    \label{fig:my_label}
\end{minipage}
\\ \\ \\
Taking the large radius to infinity and the small radius to 0:
\begin{gather*}
    \left|\int_\Gamma \right|= \left| \int_{\varepsilon}^{2\pi-\varepsilon} \frac{Ri\ d\theta}{R^ne^{ni\theta}\ln(1-Re^{i\theta})}\right|\lessapprox \int_{\varepsilon}^{2\pi-\varepsilon} \left|\frac{1}{R^{n-1}\ln(R)}\right|\ d\theta \xrightarrow{R\rightarrow \infty} 0\\
    \left|\int_\gamma \right|= \left| \int_{\varepsilon}^{2\pi-\varepsilon} \frac{ri\ d\theta}{(1+re^{i\theta})^n\ln(-re^{i\theta})}\right|\lessapprox \int_{\varepsilon}^{2\pi-\varepsilon} \left|\frac{r}{\ln(r)}\right|\ d\theta \xrightarrow{r\rightarrow 0} 0.
\end{gather*}
For the remaining two curves,
\begin{align*}
    \int_{C_1} &= \int_{1+\varepsilon}^R \frac{dx}{(x+i\varepsilon)^n\ln(1-x-i\varepsilon)} \\
    &= \int_{1+\varepsilon}^R \frac{dx}{(x+i\varepsilon)^n(\ln|1-x-i\varepsilon|+ i\arg(1-x-i\varepsilon) )}\\
    &\xrightarrow{\substack{\varepsilon \rightarrow 0\\R\rightarrow \infty}} \int_{1}^\infty \frac{dx}{x^n(\ln(x-1)-i\pi)}\\
    &= \int_{1}^\infty \frac{\ln(x-1)+i\pi}{x^n(\ln^2(x-1)+\pi^2)}\ dx\\
    \int_{C_2} &= \int^{1+\varepsilon}_R \frac{dx}{(x-i\varepsilon)^n\ln(1-x+i\varepsilon)} \\
    &=- \int_{1+\varepsilon}^R \frac{dx}{(x-i\varepsilon)^n(\ln|1-x+i\varepsilon|+ i\arg(1-x+i\varepsilon) )}\\
    &\xrightarrow{\substack{\varepsilon \rightarrow 0\\R\rightarrow \infty}} -\int_{1}^\infty \frac{dx}{x^n(\ln(x-1)+i\pi)}\\
    &= -\int_{1}^\infty \frac{\ln(x-1)-i\pi}{x^n(\ln^2(x-1)+\pi^2)}\ dx
\end{align*}
Combining everything above,
\begin{align*}
    a_n &= \frac{1}{2\pi i}\int_{1}^\infty \frac{2\pi i}{x^n(\ln^2(x-1)+\pi^2)}\ dx\\
    &= \int_{1}^\infty \frac{dx}{x^n(\ln^2(x-1)+\pi^2)}>0.
\end{align*}