---
tags:
  - cp-algorithms
e_maxx_link: extended_euclid_algorithm
---

# Algoritmo de Euclides Extendido

Mientras que el [Algoritmo de Euclides](euclid-algorithm) sólo calcula el máximo común divisor (GCD) de dos enteros $a$ y $b$, la versión extendida también encuentra una forma de representar el GCD en términos de $a$ y $b$, es decir, los coeficientes $x$ e $y$ para los que:

$$a \cdot x + b \cdot y = \gcd(a, b)$$

Es importante señalar que por la [identidad de Bézout](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_identity) siempre podemos encontrar una representación de este tipo. Por ejemplo, $\gcd(55, 80) = 5$, por lo que podemos representar $5$ como una combinación lineal con los términos $55$ y $80$: $55 \cdot 3 + 80 \cdot (-2) = 5$.

Una forma más general de ese problema se discute en el artículo sobre _**Ecuaciones Diofantinas Lineales**_.
Esta se basará en este algoritmo.
<!-- [Ecuaciones Diofantinas Lineales](linear-diophantine-equation.md). -->

## Algoritmo

En esta sección denotaremos el GCD de $a$ y $b$ con $g$.

Los cambios en el algoritmo original son muy sencillos.
Si recordamos el algoritmo, podemos ver que el algoritmo termina con $b = 0$ y $a = g$.
Para estos parámetros podemos encontrar fácilmente los coeficientes: $g \cdot 1 + 0 \cdot 0 = g$.

A partir de estos coeficientes $(x, y) = (1, 0)$, podemos ir hacia atrás en las llamadas recursivas.
Todo lo que tenemos que hacer es averiguar cómo cambian los coeficientes $x$ e $y$ durante la transición de $(a, b)$ a $(b, a \bmod b)$.

Supongamos que encontramos los coeficientes $(x_1, y_1)$ para $(b, a \bmod b)$:

$$b \cdot x_1 + (a \bmod b) \cdot y_1 = g$$

y queremos encontrar el par $(x, y)$ para $(a, b)$:

$$ a \cdot x + b \cdot y = g$$

Podemos representar $a \bmod b$ como:

$$ a \bmod b = a - \left\lfloor \frac{a}{b} \right\rfloor \cdot b$$

Sustituyendo esta expresión en la ecuación del coeficiente de $(x_1, y_1)$ se obtiene:

$$ g = b \cdot x_1 + (a \bmod b) \cdot y_1 = b \cdot x_1 + \left(a - \left\lfloor \frac{a}{b} \right\rfloor \cdot b \right) \cdot y_1$$

y después de reordenar los términos:

$$g = a \cdot y_1 + b \cdot \left( x_1 - y_1 \cdot \left\lfloor \frac{a}{b} \right\rfloor \right)$$

Encontramos los valores de $x$ e $y$:

$$
\begin{cases}
x = y_1 \\
y = x_1 - y_1 \cdot \left\lfloor \frac{a}{b} \right\rfloor
\end{cases}
$$

## Implementación

```cpp title="extended_gcd"
int gcd(int a, int b, int& x, int& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    int x1, y1;
    int d = gcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - y1 * (a / b);
    return d;
}
```

La función recursiva anterior devuelve el GCD y los valores de los coeficientes a `x` y `y` (que se pasan por referencia a la función).

Esta implementación del algoritmo produce resultados correctos también para enteros negativos.

## Implementación Iterativa

También es posible escribir el algoritmo euclídeo extendido de forma iterativa.
Debido a que evita la recursividad, el código se ejecutará un poco más rápido que el recursivo.

```cpp title="extended_gcd_iter"
int gcd(int a, int b, int& x, int& y) {
    x = 1, y = 0;
    int x1 = 0, y1 = 1, a1 = a, b1 = b;
    while (b1) {
        int q = a1 / b1;
        tie(x, x1) = make_tuple(x1, x - q * x1);
        tie(y, y1) = make_tuple(y1, y - q * y1);
        tie(a1, b1) = make_tuple(b1, a1 - q * b1);
    }
    return a1;
}
```

Si te fijas bien en las variables `a1` y `b1`, puedes observar que toman exactamente los mismos valores que en la versión iterativa del [Algoritmo de Euclides](euclid-algorithm) normal. Así que el algoritmo calculará al menos el GCD correcto.

Para ver por qué el algoritmo también calcula los coeficientes correctos, puedes comprobar que los siguientes invariantes se mantienen en cualquier momento (antes del bucle while y al final de cada iteración): $x \cdot a + y \cdot b = a_1$ y $x_1 \cdot a + y_1 \cdot b = b_1$.
Es trivial percatarse, que estas dos ecuaciones se satisfacen al principio.
Y se puede comprobar que la actualización en la iteración del bucle seguirá manteniendo esas igualdades válidas.

Al final sabemos que $a_1$ contiene el GCD, por lo que $x \cdot a + y \cdot b = g$.
Lo que significa que hemos encontrado los coeficientes necesarios.

Incluso se puede optimizar más el código, y eliminar la variable $a_1$ y $b_1$ del código, y sólo reutilizar $a$ y $b$.
Sin embargo, si lo hace, se pierde la capacidad de argumentar sobre los invariantes (aka: algo que no cambia al aplicarle un conjunto de transformaciones).

## Problemas de Práctica

* [UVA - 10104 - Euclid Problem](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1045)
* [GYM - (J) Once Upon A Time](http://codeforces.com/gym/100963)
* [UVA - 12775 - Gift Dilemma](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4628)
