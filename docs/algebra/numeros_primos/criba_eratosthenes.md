---
tags:
  - cp-algorithms
e_maxx_link: eratosthenes_sieve
---

# Criba de Eratóstenes

La Criba de Eratóstenes es un algoritmo para encontrar todos los números primos en un segmento $[1;n]$ usando $O(n \log \log n)$ operaciones.

El algoritmo es muy sencillo:
al principio escribimos todos los números entre 2 y $n$.
Marcamos todos los múltiplos propios de 2 (ya que 2 es el número primo más pequeño) como compuestos.
Un múltiplo propio de un número $x$, es un número mayor que $x$ y divisible por $x$.
Entonces encontramos el siguiente número que no ha sido marcado como compuesto, en este caso es el 3.
Lo que significa que 3 es primo, y marcamos todos los múltiplos propios de 3 como compuestos.
El siguiente número sin marcar es el 5, que es el siguiente número primo, y marcamos todos los múltiplos propios de él.
Y continuamos este procedimiento hasta que hayamos procesado todos los números de la fila.

En la siguiente imagen se puede ver una visualización del algoritmo para calcular todos los números primos en el rango $[1; 16]$. Se puede ver que a menudo marcamos los números como compuestos varias veces.

<center>![Criba de Eratostenes](criba_eratosthenes1.png)</center>

La idea es la siguiente:
Un número es primo si ninguno de los números primos más pequeños lo divide.
Como iteramos sobre los números primos en orden, ya hemos marcado como divisibles todos los números que son divisibles por al menos uno de los números primos.
Por lo tanto, si llegamos a una casilla y no está marcada, entonces no es divisible por ningún número primo menor y, por lo tanto, tiene que ser primo.

## Implementación

```cpp
int n;
vector<bool> is_prime(n+1, true);
is_prime[0] = is_prime[1] = false;
for (int i = 2; i <= n; i++) {
    if (is_prime[i] && (long long)i * i <= n) {
        for (int j = i * i; j <= n; j += i)
            is_prime[j] = false;
    }
}
```

Este código marca primero todos los números excepto el cero y el uno como números primos potenciales, y luego comienza el proceso de cribar los números compuestos.
Para ello itera sobre todos los números de $2$ a $n$.
Si el número actual $i$ es un número primo, marca todos los números que son múltiplos de $i$ como números compuestos, a partir de $i^2$.
Esto ya es una optimización sobre la forma ingenua de implementarlo, y se permite ya que todos los números más pequeños que son múltiplos de $i$ necesarios también tienen un factor primo que es menor que $i$, por lo que todos ellos ya fueron tamizados antes.
Dado que $i^2$ puede desbordar fácilmente el tipo `int`, la verificación adicional se realiza utilizando el tipo `long long` antes del segundo bucle anidado.

Usando esta implementación el algoritmo consume $O(n)$ de memoria (obviamente) y realiza $O(n \log \log n)$ (ver siguiente sección).

## Análisis asintótico

Es sencillo demostrar un tiempo de ejecución de $O(n \log n)$ sin saber nada acerca de la distribución de los primos - ignorando la comprobación `is_prime`, el bucle interior se ejecuta (como mucho) $n/i$ veces para $i = 2, 3, 4, \dots$, lo que lleva a que el número total de operaciones en el bucle interior sea una suma armónica como $n(1/2 + 1/3 + 1/4 + \cdots)$, que está acotada por $O(n \log n)$.

Vamos a demostrar que el tiempo de ejecución del algoritmo es $O(n \log \log n)$.
El algoritmo realizará $\frac{n}{p}$ operaciones para cada primo $p \le n$ en el bucle interior.
Por lo tanto, tenemos que evaluar la siguiente expresión:

$$
\sum_{\substack{p \le n, \\\ p \text{ primo}}} \frac n p = n \cdot \sum_{\substack{p \le n, \\\ p \text{ primo}}} \frac 1 p
$$

Recordemos dos hechos conocidos.

  - El número de números primos menores o iguales que $n$ es aproximadamente $\frac n {\ln n}$.
  - El $k$-ésimo número primo es aproximadamente igual a $k \ln k$ (esto se deduce inmediatamente del hecho anterior).

Así podemos escribir la suma de la siguiente manera:

$$
\sum_{\substack{p \le n, \\\ p \text{ primo}}} \frac 1 p \approx \frac 1 2 + \sum_{k = 2}^{\frac n {\ln n}} \frac 1 {k \ln k}.
$$

Aquí extrajimos el primer número primo 2 de la suma, porque $k = 1$ en la aproximación $k \ln k$ es $0$ y provoca una división por cero.

Ahora, evaluemos esta suma usando la integral de una misma función sobre $k$ de $2$ a $\frac n {\ln n}$ (podemos hacer tal aproximación porque, de hecho, la suma está relacionada con la integral como su aproximación usando el método del rectángulo):

$$
\sum_{k = 2}^{\frac n {\ln n}} \frac 1 {k \ln k} \approx \int_2^{\frac n {\ln n}} \frac 1 {k \ln k} dk
$$

La antiderivada del integrando es $\ln \ln k$. Usando una sustitución y eliminando términos de orden inferior, obtendremos el resultado:

$$
\int_2^{\frac n {\ln n}} \frac 1 {k \ln k} dk = \ln \ln \frac n {\ln n} - \ln \ln 2 = \ln(\ln n - \ln \ln n) - \ln \ln 2 \approx \ln \ln n
$$

Ahora, volviendo a la suma original, obtendremos su evaluación aproximada:

$$
\sum_{\substack{p \le n, \\\ p\ is\ prime}} \frac n p \approx n \ln \ln n + o(n)
$$

Puede encontrar una prueba más estricta (que proporciona una evaluación más precisa que es exacta dentro de multiplicadores constantes) en el libro de Hardy & Wright "An Introduction to the Theory of Numbers" (p. 349).

## Diferentes optimizaciones del Criba de Eratóstenes

La mayor debilidad del algoritmo es que "recorre" la memoria varias veces, manipulando sólo elementos individuales.
Esto no es muy amigable para la caché.
Y debido a eso, la constante que se oculta en $O(n \log \log n)$ es comparativamente grande.

Además, la memoria consumida es un cuello de botella para grandes $n$.

Los métodos presentados a continuación nos permiten reducir la cantidad de operaciones realizadas, así como acortar notablemente la memoria consumida.

### Cribar hasta la raíz

Obviamente, para encontrar todos los números primos hasta $n$, bastará con realizar la criba sólo por los números primos, que no superen la raíz de $n$.

```cpp
int n;
vector<bool> is_prime(n+1, true);
is_prime[0] = is_prime[1] = false;
for (int i = 2; i * i <= n; i++) {
    if (is_prime[i]) {
        for (int j = i * i; j <= n; j += i)
            is_prime[j] = false;
    }
}
```

Dicha optimización no afecta a la complejidad (de hecho, repitiendo la prueba presentada anteriormente obtendremos la evaluación $n \ln \ln \sqrt n + o(n)$, que es asintóticamente la misma según las propiedades de los logaritmos), aunque el número de operaciones se reducirá notablemente.

### Cribar sólo por los números impares

Como todos los números pares (excepto $2$) son compuestos, podemos dejar de comprobar los números pares. En su lugar, tenemos que operar sólo con los números impares.

En primer lugar, nos permitirá reducir a la mitad la memoria necesaria. En segundo lugar, reducirá el número de operaciones realizadas por el algoritmo aproximadamente a la mitad.

### Consumo de memoria y velocidad de las operaciones

Debemos notar, que estas dos implementaciones de la Criba de Eratóstenes utilizan $n$ bits de memoria mediante el uso de la estructura de datos `vector<bool>`.
El `vector<bool>` no es un contenedor normal que almacena una serie de `bool` (como en la mayoría de las arquitecturas de ordenador un `bool` ocupa un byte de memoria).
Es una especialización de optimización de memoria de `vector<T>`, que sólo consume $\frac{N}{8}$ bytes de memoria.

Las arquitecturas de los procesadores modernos trabajan mucho más eficientemente con bytes que con bits, ya que normalmente no pueden acceder a los bits directamente.
Así que por debajo del `vector<bool>` almacena los bits en una gran memoria continua, accede a la memoria en bloques de unos pocos bytes, y extrae/configura los bits con operaciones de bits como enmascaramiento de bits y desplazamiento de bits.

Por eso hay una cierta sobrecarga cuando lees o escribes bits con un `vector<bool>`, y a menudo es más rápido usar un `vector<char>` (que usa 1 byte para cada entrada, por lo que ocupa 8 veces más memoria).

Sin embargo, para las implementaciones simples de la Criba de Eratóstenes usar un `vector<bool>` es más rápido.
Estás limitado por la velocidad a la que puedes cargar los datos en la caché, y por tanto usar menos memoria supone una gran ventaja.
Un benchmark ([link](https://gist.github.com/jakobkogler/e6359ea9ced24fe304f1a8af3c9bee0e)) muestra que usar un `vector<bool>` es entre 1.4x y 1.7x más rápido que usar un `vector<char>`.

Las mismas consideraciones se aplican también a un `bitset`.
También es una forma eficiente de almacenar bits, similar a `vector<bool>`, por lo que sólo ocupa $\frac{N}{8}$ bytes de memoria, pero es un poco más lento en el acceso a los elementos.
En la prueba anterior, `bitset` funciona un poco peor que un `vector<bool>`.
Otro inconveniente del `bitset` es que es necesario conocer el tamaño en tiempo de compilación.

### Criba segmentada

De la optimización "cribar hasta la raíz" se deduce que no es necesario mantener toda la matriz `is_prime[1...n]` en todo momento.
Para cribar basta con mantener los números primos hasta la raíz de $n$, es decir, `prime[1... sqrt(n)]`, dividir el rango completo en bloques, y cribar cada bloque por separado.

Sea $s$ una constante que determina el tamaño del bloque, entonces tenemos $\lceil {\frac n s} \rceil$ bloques en total, y el bloque $k$ ($k = 0 ... \lfloor {\frac n s} \rfloor$) contiene los números en un segmento $[ks; ks + s - 1]$.
Podemos trabajar en bloques por turnos, es decir, para cada bloque $k$ pasaremos por todos los números primos (de $1$ a $\sqrt n$) y realizaremos el cribado utilizándolos.
Vale la pena señalar, que tenemos que modificar la estrategia un poco al manejar los primeros números: en primer lugar, todos los números primos de $[1; \sqrt n]$ no deben eliminarse; y en segundo lugar, los números $0$ y $1$ deben marcarse como números no primos.
Mientras se trabaja en el último bloque no hay que olvidar que el último número necesario $n$ no se encuentra necesariamente al final del bloque.

Como se ha comentado anteriormente, la implementación típica de la Criba de Eratóstenes está limitada por la velocidad a la que se pueden cargar los datos en las cachés de la CPU.
Al dividir el rango de números primos potenciales $[1; n]$ en bloques más pequeños, nunca tenemos que mantener varios bloques en memoria al mismo tiempo, y todas las operaciones son mucho más amigables con la caché.
Como ahora ya no estamos limitados por las velocidades de la caché, podemos sustituir el `vector<bool>` por un `vector<char>`, y ganar algo de rendimiento adicional ya que los procesadores pueden manejar lecturas y escrituras con bytes directamente y no necesitan depender de operaciones con bits para extraer bits individuales.
El benchmark ([link](https://gist.github.com/jakobkogler/e6359ea9ced24fe304f1a8af3c9bee0e)) muestra que usar un `vector<char>` es 3 veces más rápido en esta situación que usar un `vector<bool>`.
Una advertencia: estos números pueden diferir dependiendo de la arquitectura, el compilador y los niveles de optimización.

Aquí tenemos una implementación que cuenta el número de primos menores o iguales que $n$ usando cribado por bloques.

```cpp
int count_primes(int n) {
    const int S = 10000;

    vector<int> primes;
    int nsqrt = sqrt(n);
    vector<char> is_prime(nsqrt + 2, true);
    for (int i = 2; i <= nsqrt; i++) {
        if (is_prime[i]) {
            primes.push_back(i);
            for (int j = i * i; j <= nsqrt; j += i)
                is_prime[j] = false;
        }
    }

    int result = 0;
    vector<char> block(S);
    for (int k = 0; k * S <= n; k++) {
        fill(block.begin(), block.end(), true);
        int start = k * S;
        for (int p : primes) {
            int start_idx = (start + p - 1) / p;
            int j = max(start_idx, p) * p - start;
            for (; j < S; j += p)
                block[j] = false;
        }
        if (k == 0)
            block[0] = block[1] = false;
        for (int i = 0; i < S && start + i <= n; i++) {
            if (block[i])
                result++;
        }
    }
    return result;
}
```

El tiempo de ejecución de la criba de bloques es el mismo que para la criba normal de Eratóstenes (a menos que el tamaño de los bloques sea muy pequeño), pero la memoria necesaria se acortará a $O(\sqrt{n} + S)$ y tendremos mejores resultados de caché.
Por otro lado, habrá una división para cada par de un bloque y un número primo de $[1; \sqrt{n}]$, y eso será mucho peor para tamaños de bloque más pequeños.
Por lo tanto, es necesario mantener el equilibrio al seleccionar la constante $S$.
Conseguimos los mejores resultados para tamaños de bloque entre $10^4$ y $10^5$.

## Encontrar números primos en un rango

A veces necesitamos encontrar todos los números primos en un rango $[L,R]$ de tamaño pequeño (por ejemplo, $R - L + 1 \approx 1e7$), donde $R$ puede ser muy grande (por ejemplo, $1e12$).

Para resolver este problema, podemos utilizar la idea de la Criba Segmentada.
Pregeneramos todos los números primos hasta $\sqrt R$, y usamos esos primos para marcar todos los números compuestos en el segmento $[L, R]$.

```cpp
vector<char> segmentedSieve(long long L, long long R) {
    // generate all primes up to sqrt(R)
    long long lim = sqrt(R);
    vector<char> mark(lim + 1, false);
    vector<long long> primes;
    for (long long i = 2; i <= lim; ++i) {
        if (!mark[i]) {
            primes.emplace_back(i);
            for (long long j = i * i; j <= lim; j += i)
                mark[j] = true;
        }
    }

    vector<char> isPrime(R - L + 1, true);
    for (long long i : primes)
        for (long long j = max(i * i, (L + i - 1) / i * i); j <= R; j += i)
            isPrime[j - L] = false;
    if (L == 1)
        isPrime[0] = false;
    return isPrime;
}
```
La complejidad temporal de este método es $O((R - L + 1) \log \log (R) + \sqrt R \log \log \sqrt R)$.

También es posible que no pregeneremos todos los números primos:

```cpp
vector<char> segmentedSieveNoPreGen(long long L, long long R) {
    vector<char> isPrime(R - L + 1, true);
    long long lim = sqrt(R);
    for (long long i = 2; i <= lim; ++i)
        for (long long j = max(i * i, (L + i - 1) / i * i); j <= R; j += i)
            isPrime[j - L] = false;
    if (L == 1)
        isPrime[0] = false;
    return isPrime;
}
```

Obviamente, la complejidad es peor, que es $O((R - L + 1) \log (R) + \sqrt R)$. Sin embargo, sigue siendo muy rápido en la práctica.

## Modificación en tiempo lineal

Podemos modificar el algoritmo de tal manera, que sólo tenga complejidad de tiempo lineal.
<!-- Este enfoque se describe en el artículo [Criba Lineal](criba_lineal_primos.md). -->
Sin embargo, este algoritmo también tiene sus propias debilidades.

## Problemas de Práctica

* [Leetcode - Four Divisors](https://leetcode.com/problems/four-divisors/)
* [Leetcode - Count Primes](https://leetcode.com/problems/count-primes/)
* [SPOJ - Printing Some Primes](http://www.spoj.com/problems/TDPRIMES/)
* [SPOJ - A Conjecture of Paul Erdos](http://www.spoj.com/problems/HS08PAUL/)
* [SPOJ - Primal Fear](http://www.spoj.com/problems/VECTAR8/)
* [SPOJ - Primes Triangle (I)](http://www.spoj.com/problems/PTRI/)
* [Codeforces - Almost Prime](http://codeforces.com/contest/26/problem/A)
* [Codeforces - Sherlock And His Girlfriend](http://codeforces.com/contest/776/problem/B)
* [SPOJ - Namit in Trouble](http://www.spoj.com/problems/NGIRL/)
* [SPOJ - Bazinga!](http://www.spoj.com/problems/DCEPC505/)
* [Project Euler - Prime pair connection](https://www.hackerrank.com/contests/projecteuler/challenges/euler134)
* [SPOJ - N-Factorful](http://www.spoj.com/problems/NFACTOR/)
* [SPOJ - Binary Sequence of Prime Numbers](http://www.spoj.com/problems/BSPRIME/)
* [UVA 11353 - A Different Kind of Sorting](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2338)
* [SPOJ - Prime Generator](http://www.spoj.com/problems/PRIME1/)
* [SPOJ - Printing some primes (hard)](http://www.spoj.com/problems/PRIMES2/)
* [Codeforces - Nodbach Problem](https://codeforces.com/problemset/problem/17/A)
* [Codeforces - Colliders](https://codeforces.com/problemset/problem/154/B)
