---
tags:
  - cp-algorithms
e_maxx_link: euclid_algorithm
---

# Algoritmo de Euclides: Máximo común divisor

Dados dos números enteros no negativos $a$ y $b$, tenemos que encontrar su **GCD** (máximo común divisor, en inglés greatest common divisor), es decir, el mayor número que es divisor de $a$ y $b$.
Comúnmente se denota por $\gcd(a, b)$. Matemáticamente se define como:

$$\gcd(a, b) = \max \{k > 0 : (k \mid a) \text{ and } (k \mid b) \}$$

(aquí el símbolo "$\mid$" denota divisibilidad, es decir, "$k \mid a$" significa "$k$ divide $a$")

Cuando uno de los números es cero, mientras que el otro es distinto de cero, su máximo común divisor, por definición, es el segundo número. Cuando ambos números son cero, su máximo común divisor no está definido (puede ser cualquier número arbitrariamente grande), pero es conveniente definirlo como cero también para preservar la asociatividad de $\gcd$. Lo que nos da una regla simple: si uno de los números es cero, el máximo común divisor es el otro número.

El algoritmo de Euclides, que se discute a continuación, permite encontrar el máximo común divisor de dos números $a$ y $b$ en $O(\log \min(a, b))$.

El algoritmo se describió por primera vez en los "Elementos" de Euclides (alrededor de 300 a.C.), pero es posible que tenga orígenes incluso anteriores.

## Algoritmo

Originalmente, el algoritmo euclídeo se formuló de la siguiente manera: restar el número menor del mayor hasta que uno de los números sea cero. En efecto, si $g$ divide $a$ y $b$, también divide $a-b$. Por otra parte, si $g$ divide $a-b$ y $b$, entonces también divide $a = b + (a-b)$, lo que significa que los conjuntos de los divisores comunes de $\{a, b\}$ and $\{b,a-b\}$ coinciden.

Obsérvese que $a$ sigue siendo el número mayor hasta que $b$ se le resta al menos $\left\lfloor\frac{a}{b}\right\rfloor$ veces. Por lo tanto, para acelerar las cosas, $a-b$ se sustituye por $a-\left\lfloor\frac{a}{b}\right\rfloor b = a \bmod b$. A continuación, el algoritmo se formula de una manera extremadamente simple:

$$\gcd(a, b) = \begin{cases}a,&\text{si }b = 0 \\ \gcd(b, a \bmod b),&\text{de lo contrario.}\end{cases}$$

## Implementación

```cpp
int gcd (int a, int b) {
    if (b == 0)
        return a;
    else
        return gcd (b, a % b);
}
```

Utilizando el operador ternario en C++, podemos escribirlo en una sola línea.

```cpp
int gcd (int a, int b) {
    return b ? gcd (b, a % b) : a;
}
```

Y por último, he aquí una implementación no recursiva:

```cpp
int gcd (int a, int b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}
```

Tenga en cuenta que desde C++17, `gcd` se implementa como una [función estándar](https://en.cppreference.com/w/cpp/numeric/gcd) en C++.

## Complejidad temporal

El tiempo de ejecución del algoritmo se estima mediante el teorema de Lamé, que establece una conexión sorprendente entre el algoritmo euclídeo y la sucesión de Fibonacci:

Si $a > b \geq 1$ y $b < F_n$ para algún $n$, el algoritmo euclídeo realiza como mucho $n-2$ llamadas recursivas.

Además, es posible demostrar que el límite superior de este teorema es óptimo. Cuando $a = F_n$ y $b = F_{n-1}$, $gcd(a, b)$ realizará exactamente $n-2$ llamadas recursivas. En otras palabras, los números Fibonacci consecutivos son el peor caso de entrada para el algoritmo de Euclides.

Dado que los números de Fibonacci crecen exponencialmente, obtenemos que el algoritmo de Euclides funciona en $O(\log \min(a, b))$.

Otra forma de estimar la complejidad es observar que $a \bmod b$ para el caso $a \geq b$ es al menos $2$ veces menor que $a$, por lo que el número mayor se reduce al menos a la mitad en cada iteración del algoritmo.

## Mínimo común múltiplo

El cálculo del mínimo común múltiplo (comúnmente denotado **LCM**, least common multiple en inglés) puede reducirse al cálculo del GCD con la siguiente fórmula simple:

$$\text{lcm}(a, b) = \frac{a \cdot b}{\gcd(a, b)}$$

Así pues, LCM puede calcularse utilizando el algoritmo euclídeo con la misma complejidad temporal:

Aquí se ofrece una posible implementación, que evita ingeniosamente los desbordamientos de enteros dividiendo primero $a$ con el GCD:

```cpp
int lcm (int a, int b) {
    return a / gcd(a, b) * b;
}
```

## GCD Binario

El algoritmo GCD binario es una optimización del algoritmo euclídeo normal.

La parte lenta del algoritmo normal son las operaciones de módulo. Las operaciones modulo, aunque las vemos como $O(1)$, son mucho mas lentas que operaciones mas simples como sumas, restas u operaciones bit a bit.
Así que sería mejor evitarlas.

Resulta que se puede diseñar un algoritmo GCD rápido que evite las operaciones módulo.
Se basa en algunas propiedades:

  - Si ambos números son pares, entonces podemos factorizar un dos de ambos y calcular el GCD de los números restantes: $\gcd(2a, 2b) = 2 \gcd(a, b)$.
  - Si uno de los números es par y el otro impar, entonces podemos quitar el factor 2 del par: $\gcd(2a, b) = \gcd(a, b)$ si $b$ es impar.
  - Si ambos números son impares, restar un número del otro no cambiará el resultado: $\gcd(a, b) = \gcd(b, a-b)$.

Usando sólo estas propiedades, y algunas funciones rápidas bitwise de GCC, podemos implementar una versión rápida:

```cpp
int gcd(int a, int b) {
    if (!a || !b)
        return a | b;
    unsigned shift = __builtin_ctz(a | b);
    a >>= __builtin_ctz(a);
    do {
        b >>= __builtin_ctz(b);
        if (a > b)
            swap(a, b);
        b -= a;
    } while (b);
    return a << shift;
}
```

Tenga en cuenta que esta optimización no suele ser necesaria, y la mayoría de los lenguajes de programación ya tienen una función GCD en sus bibliotecas estándar.
Por ejemplo, C++17 tiene una función `std::gcd` en el header `numeric`.

## Problemas de Práctica

- [CSAcademy - Greatest Common Divisor](https://csacademy.com/contest/archive/task/gcd/)
