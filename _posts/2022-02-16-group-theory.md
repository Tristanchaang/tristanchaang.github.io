---
layout: post
title: "Group Theory for Beginners"
---

Sets are useful in mathematics, but some sets have more structure than others. For example, an extra property $\mathbb{Z}$ has over $\mathbb{N}$ would be the fact that the difference of any two elements in the set is also in the set. Beyond that, an extra property $\mathbb{Q}$ has over $\mathbb{Z}$ would be the fact that the quotient of any two nonzero elements in the set is also in the set.

We want to characterise sets with nice structures. In mathematics, when we give a definition, we have to consider how broad the definition should be: If the definition is too narrow, there won't be a lot of examples of them; if the definition is too broad, there won't be many nice properties that we can infer from them as a whole. 

Before we define a group, we have to define a binary operation. A _binary operation_ on a set $A$, like the $+,-,\times$ operations on $\mathbb{Z}, is technically a function from $A\times A \rightarrow A$, that is, a function taking two inputs and giving one output in the same set. For example, $5+3=8$ can be said as $+$ taking the input $(5,3)$ and giving the output $8$, or written non-conventionally as $+(5,3)=8$.

Some binary operations are 'neat', others are not: 