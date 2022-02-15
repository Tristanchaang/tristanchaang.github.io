---
layout: post
title: "Infinite Expectation?"
---

> "Stake any amount of money you can get your hands on on this game, because the expected number of winnings is infinite." - Mark Jago, _Infinity Paradoxes_, Numberphile

Consider the following game: You start with 1 dollar in a jar, and you flip a coin. If it turns up to be tails, take whatever's in the jar (in this case, 1 dollar) and the game is over. If it turns up to be heads, double the money in the jar and repeat the previous process. How much are you willing to pay to enter this game? 

Let's compute the expected prize of this game. The game must be a sequence of (say $n$) tails and then a head, in which case you earn $2^n$ dollars. The probability of getting $n$ tails and then a head is $\frac{1}{2^{n+1}}$, so the expected prize is

<p align="center">$\displaystyle \sum_{n=0}^\infty 2^n \cdot \frac{1}{2^{n+1}} = \sum_{n=0}^\infty \frac{1}{2}\rightarrow +\infty$. </p>

What's going on here? The expected prize is infinite! In other words, if you play this game enough number of times, you will, on average, get infinite money, so anyone should pay any finite amount of money to play this game.

However, this does not make much sense. What if you just paid $10^{100}$ dollars to play the game, but got a tails on the first try? I cannot imagine how angry you would be.

Is this computation hence flawed? Or are human beings just not rational enough? The key reason why $E(X)$ is infinite is because the prizes are rising with the same speed as the fall in the probability. In essence, it is a situation where _winning a lot of money is rare, but if I won I would get so much money!_ If we were to play this game infinitely many times, then the amount of money won from the really lucky games will eventually cover up the games in which we only won a little a bit of money.

Hence the computation isn't flawed, but human beings aren't irrational either. It is impossible to play this game an arbitrarily large number of times. Even if we can, casinoes will not host this game as they will also expect infinite losses!