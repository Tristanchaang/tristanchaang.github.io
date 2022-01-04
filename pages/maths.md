---
layout: page
title: Maths
permalink: /maths/
---

<style TYPE="text/css">
code.has-jax {font: inherit; font-size: 100%; background: inherit; border: inherit;}
</style>
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'] // removed 'code' entry
    }
});
MathJax.Hub.Queue(function() {
    var all = MathJax.Hub.getAllJax(), i;
    for(i = 0; i < all.length; i += 1) {
        all[i].SourceElement().parentNode.className += ' has-jax';
    }
});
</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML-full"></script>

Here are some of my favourite mathematical problems and some problems that I have set for BIMO:

# Problem 1

Let $k$ be a fixed positive integer and $f$ be a polynomial with integer coefficients such that $f(x) \neq 0$
for all $x \in \mathbb{Z}$. We know that
\\(f(x) \mid f(x + k)\\)
for all $x \in \mathbb{Z}$. Prove that $f$ is constant.

# Burnside's Lemma

Let $G$ be any permutation group of $N=\{1,\cdots,n\}$. Let $f: N\rightarrow \{1,\cdots,m\}$ be a colouring of $N$. Two colourings $f_1$ and $f_2$ are said to be equivalent if $f_1(x)=f_2(g\cdot x)$ for some $g\in G$. The number of equivalence classes is
$ \frac{1}{|G|}\sum\_\{g\in G\}m^{C(g)}$
where $C(g)$ is the number of cycles in the cyclic decomposition of $g$.
