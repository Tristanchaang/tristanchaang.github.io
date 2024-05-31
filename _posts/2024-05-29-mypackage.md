---
layout: post
title: "My LaTeX Package"
---

I have modified the MIT Course 6 LaTeX Package to one that is suited for my convenience and purposes. 


To use the package on Overleaf, upload the .cls file onto your project, and type the following into your .tex file:

>\documentclass{natsirt}
>
>\title{...}
>
>\author{...}
>
>\begin{document}
>
>...
>
>\end{document}

## Some Features

# New Chapter and Subchapters

\chapter{} and \chapterpart{} will create chapter titles. \chapter{} will create a page break for every subsequent chapter.

# Blue, Green, Red and White Boxes

The environment commands \begin{bluebox}, \begin{greenbox}, \begin{redbox} and \begin{whitebox} create a colored box in which you can type paragraphs.

# Shorthands

| \DS           | \TS        |
|:-------------:|:----------:|
| \displaystyle | \textstyle |

# Brackets

These brackets support automatic size correction. E.g. \pr{\sum} will be $\left(\sum\right)$ instead of $(\sum)$

| \pr{...} | \br{...} | \ar{...}               | \set{...} | \abs{...}       | \norm{...}        | \fl{...}             | \ce{...}           |
|:--------:|:--------:|:----------------------:|:---------:|:---------------:|:-----------------:|:--------------------:|:------------------:|
| $(...)$  | $[...]$  | $\langle ... \rangle$  | $\\{...\\}$ | $\mid ... \mid$ | $\Vert ... \Vert$ | $\lfloor...\rfloor$  | $\lceil...\rceil$  |

# Function Shorthands

| \prb{...}        | \epv{...}        | \var{...}        | \Re{...}           | \Im{...}           | \under{abc}{xyz}             |
|:----------------:|:----------------:|:----------------:|:------------------:|:------------------:|:----------------------------:|
| $\mathbb{P}[...] | $\mathbb{E}[...] | $\mathbb{V}[...] | \mathfrak{Re}[...] | \mathfrak{Im}[...] | \underset{xyz}{\mathrm{abc}} |

<a href="https://raw.githubusercontent.com/Tristanchaang/tristanchaang.github.io/main/downloads/natsirt.zip" download>Click here</a> to download.
