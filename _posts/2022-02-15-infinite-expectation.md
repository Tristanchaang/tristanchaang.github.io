---
layout: post
title: "Infinite Expectation?"
---

> "Stake any amount of money you can get your hands on on this game, because the expected number of winnings is infinite." - Mark Jago, _Infinity Paradoxes_, Numberphile

Consider the following game: You start with 1 dollar in a jar, and you flip a coin. If it turns up to be tails, take whatever's in the jar (in this case, 1 dollar) and the game is over. If it turns up to be heads, double the money in the jar and repeat the previous process. How much are you willing to pay to enter this game? 

Let's compute the expected prize of this game. The game must be a sequence of (say $n$) tails and then a head, in which case you earn $2^n$ dollars. The probability of getting $n$ tails and then a head is $\frac{1}{2^{n+1}}$, so the expected prize is

<p align="center">$\displaystyle \sum_{n=0}^\infty 2^n \cdot \frac{1}{2^{n+1}} = \sum_{n=0}^\infty \frac{1}{2}\rightarrow +\infty$. </p>