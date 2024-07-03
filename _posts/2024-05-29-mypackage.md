---
layout: post
title: "My LaTeX Package"
---

<a href="https://raw.githubusercontent.com/Tristanchaang/tristanchaang.github.io/main/downloads/natsirt.zip" download="download">Click here</a> to download the zip file that contains 'natsirt.cls'.

I have modified the MIT Course 6 LaTeX Package to one that is suited for my convenience and purposes. For an example of a product of this package, see my [18.100B Notes](https://tristanchaang.github.io/notes/real_analysis).

To use the package on Overleaf, upload the .cls file onto your project, and type the following into your .tex file:

>\documentclass{natsirt}
>
>\title{...}
>
>\author{...}
>
>\subtitle{...} % optional
>
>\begin{document}
>
>...
>
>\end{document}

## Extra Features

# New Chapter and Subchapters

\chapter{} and \chapterpart{} will create chapter titles. \chapter{} will create a page break for every subsequent chapter.

# Blue, Green, Red and White Boxes

The environment commands \begin{bluebox}, \begin{greenbox}, \begin{redbox} and \begin{whitebox} create a colored box in which you can type paragraphs.

# Brackets

These brackets support automatic size correction. E.g. \pr{\sum} will be $\left(\sum\right)$ instead of $(\sum)$

| \pr{...} | \br{...} | \ar{...} | \set{...} | \abs{...} | \norm{...} | \fl{...} | \ce{...} |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $(...)$  | $[...]$  | $\langle ... \rangle$  | $\\{...\\}$ | $\mid ... \mid$ | $\Vert ... \Vert$ | $\lfloor...\rfloor$  | $\lceil...\rceil$  |

# Function Shorthands

| \prb{...} | \epv{...} | \var{...} | \Re{...} | \Im{...} |
|:-:|:-:|:-:|:-:|:-:|
| $\mathbb{P}[...]$ | $\mathbb{E}[...]$ | $\mathbb{V}[...]$ | $\mathfrak{Re}[...]$ | $\mathfrak{Im}[...]$ |

| \under{abc}{x} | \od{a}{b} | \pd{a}{b} |
|:-:|:-:|:-:|
| $\underset{x}{\mathrm{abc}}$ | $\frac{\mathrm{d}a}{\mathrm{d}b}$ | $\frac{\partial a}{\partial b}$ |

# Symbols

| \emp | \A,\B,...,\Z | \eps | \phi |
|:-:|:-:|:-:|:-:|
| $\varnothing$ | $\mathbb{A},\mathbb{B},\cdots,\mathbb{Z}$ | $\varepsilon$ | $\varphi$ |

| \\> | \imply | \iff | \qed | \QED | \mod{...} | \df |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $\rightarrow$ | $\Rightarrow$ | $\Leftrightarrow$ | $\square$ | $\blacksquare$ | $(\mathrm{mod} \ ...)$ | $\mathrm{d}$ |

# Others

| \DS           | \TS        | \cases{abc\\\ xyz\\\ ...} | \ol{abc} | \td{abc} | \emph{text} | \scr{ABC} |
|:-------------:|:----------:|:-:|:-:|:-:|:-:|:-:|
| \displaystyle | \textstyle | $\begin{cases}abc \\\ xyz\\\ \vdots \end{cases}$ | $\overline{abc}$ | $\widetilde{abc}$ | $\mathbf{\textit{text}}$ | $\mathscr{ABC}$ |

# Example

```f_X(x) = \od{}{t}\prb{X\leq t} = \cases{1, & 0\leq x \leq 1 \\ 0, & \text{otherwise}}```

$$ f_X(x) = \frac{\mathrm{d}}{\mathrm{d}t}\mathbb{P}[X\leq t] = \begin{cases}1, & 0\leq x \leq 1\\ 0, & \text{otherwise}\end{cases} $$

``` f \in \mathcal{R}(a,b) \iff \under{inf}{a=x_0<\cdots<x_N=b} \sum_{i=1}^{N} (x_i - x_{i-1}) \under{osc}{[x_{i-1}, x_i]} f = 0 ```

$$f \in \mathcal{R}(a,b) \ \Leftrightarrow \ \underset{a=x_0<\cdots<x_N=b}{\mathrm{inf}} \sum_{i=1}^{N} (x_i - x_{i-1}) \underset{[x_{i-1}, x_i]}{\mathrm{osc}} f = 0 $$