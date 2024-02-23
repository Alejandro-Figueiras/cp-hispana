---
tags:
  - cp-algorithms
e_maxx_link: binary_pow
---

# Exponenciación binaria

La exponenciación binaria (también conocida como exponenciación por cuadratura) es un truco que permite calcular $a^n$ utilizando sólo $O(\log n)$ multiplicaciones (en lugar de $O(n) $multiplicaciones requeridas por el enfoque ingenuo).

También tiene importantes aplicaciones en muchas tareas no relacionadas con la aritmética, ya que
puede utilizarse con cualquier operación que tenga la propiedad de **asociatividad**:

$$
(X \cdot Y) \cdot Z = X \cdot (Y \cdot Z)
$$

Lo más evidente es que esto se aplica a la multiplicación modular, a la multiplicación de matrices y a otros problemas que trataremos más adelante.

## Algoritmo

Elevar $a$ a la potencia de $n$ se expresa ingenuamente como una multiplicación por $a$ hecha $n - 1$ veces:
$a^{n} = a \cdot a \cdot \ldots \cdot a$. Sin embargo, este enfoque no es práctico para grandes valores de $a$ o $n$.

$a^{b+c} = a^b \cdot a^c$ y $a^{2b} = a^b \cdot a^b = (a^b)^2$

La idea de la exponenciación binaria es que dividimos el trabajo utilizando la representación binaria del exponente.

Escribamos $n$ en base 2, por ejemplo:

$$
3^{13} = 3^{1101_2} = 3^8 \cdot 3^4 \cdot 3^1
$$

Dado que el número $n$ tiene exactamente $\lfloor \log_2 n \rfloor + 1$ dígitos en base 2, sólo necesitamos realizar  $O(\log n)$ multiplicaciones si conocemos las potencias $a^1, a^2, a^4, a^8, \dots, a^{2^{lfloor \log n \rfloor}}$.

Así que sólo necesitamos saber una forma rápida de calcularlos.
Afortunadamente esto es muy fácil, ya que un elemento en la secuencia es sólo el cuadrado del elemento anterior.

$$
3^1 = 3 \\
3^2 = \left(3^1\right)^2 = 3^2 = 9 \\
3^4 = \left(3^2\right)^2 = 9^2 = 81 \\
3^8 = \left(3^4\right)^2 = 81^2 = 6561
$$

Así que para obtener la respuesta final para $3^{13}$, sólo tenemos que multiplicar tres de ellos (omitiendo $3^2$ porque el bit correspondiente en $n$ es cero):
$3^{13} = 6561 \cdot 81 \cdot 3 = 1594323$

La complejidad final de este algoritmo es $O(\log n)$: tenemos que calcular $\log n$ potencias de $a$, y luego tenemos que hacer como mucho $\log n$ multiplicaciones para obtener la respuesta final a partir de ellas.

La siguiente aproximación recursiva expresa la misma idea:

$$
a^n = \begin{cases}
1 &\text{si } n == 0 \\
\left(a^{\frac{n}{2}}\right)^2 &\text{si } n > 0 \text{ y } n \text{ par}\\
\left(a^{\frac{n - 1}{2}}\right)^2 \cdot a &\text{si } n > 0 \text{ y } n \text{ impar}\\
\end{cases}
$$

## Implementación

Primero, el enfoque recursivo, que es una traducción directa de la fórmula recursiva:

```cpp
long long binpow(long long a, long long b) {
    if (b == 0)
        return 1;
    long long res = binpow(a, b / 2);
    if (b % 2)
        return res * res * a;
    else
        return res * res;
}
```

El segundo enfoque realiza la misma tarea sin recursividad.
Calcula todas las potencias en un bucle, y multiplica las unas con el correspondiente bit establecido en $n$.
Aunque la complejidad de ambos enfoques es idéntica, este enfoque será más rápido en la práctica, ya que no tenemos la sobrecarga de las llamadas recursivas.

```cpp
long long binpow(long long a, long long b) {
    long long res = 1;
    while (b > 0) {
        if (b & 1)
            res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}
```

## Aplicaciones

### Cálculo efectivo de grandes exponentes módulando a un número

**Problema:**
Calcular $x^n \bmod m$.
Esta es una operación muy común. Por ejemplo, se utiliza en el cálculo de la _**inversa multiplicatica modular**_.
<!-- TODO link this [inversa multiplicativa modular](module-inverse.md) -->

**Solución:**
Como sabemos que el operador módulo no interfiere con las multiplicaciones ($a \cdot b \equiv (a \bmod m) \cdot (b \bmod m) \pmod m$), podemos utilizar directamente el mismo código, y simplemente sustituir cada multiplicación por una multiplicación modular:

```cpp
long long binpow(long long a, long long b, long long m) {
    a %= m;
    long long res = 1;
    while (b > 0) {
        if (b & 1)
            res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}
```

**Nota:**
Es posible acelerar este algoritmo para grandes $b >> m$.
Si $m$ es un número primo $x^n \equiv x^{n \bmod (m-1)} \pmod{m}$ para $m$ primo, y $x^n \equiv x^{n \bmod{\phi(m)}} \pmod{m}$ para $m$ compuesto.
Esto se deduce directamente del pequeño teorema de Fermat y del teorema de Euler, véase el artículo sobre **_Modular Inverses_** para más detalles.
<!-- TODO link this [Modular Inverses](module-inverse.md#fermat-euler)-->


### Cálculo efectivo de los números de Fibonacci

**Problema:** Calcular $n$-ésimo número de Fibonacci $F_n$.

<!-- TODO link this -->
**Solución:** Para más detalles, véase el artículo **_Numeros de Fibonacci_**
<!--  [Números de Fibonacci](fibonacci-numbers.md). -->
Nosotros sólo vamos a dar una visión general del algoritmo.
Para calcular el siguiente número de Fibonacci, sólo se necesitan los dos anteriores, ya que $F_n = F_{n-1} + F_{n-2}$.
Podemos construir una matriz de $2 \times 2$ que describa esta transformación:
la transición de $F_i$ y $F_{i+1}$ a $F_{i+1}$ y $F_{i+2}$.
Por ejemplo, aplicando esta transformación al par $F_0$ y $F_1$ lo cambiaríamos por $F_1$ y $F_2$.
Por lo tanto, podemos elevar esta matriz de transformación a la potencia $n$-ésima para encontrar $F_n$ en complejidad de tiempo $O(\log n)$.

### Aplicar una permutación $k$ veces

**Problema:** Se da una sucesión de longitud $n$. Aplícale una permutación dada $k$ veces.

**Solución:** Basta con elevar la permutación a la $k$-ésima potencia mediante exponenciación binaria, y luego aplicarla a la secuencia. Esto le dará una complejidad de tiempo de $O(n \log k)$

```cpp
vector<int> applyPermutation(vector<int> sequence, vector<int> permutation) {
    vector<int> newSequence(sequence.size());
    for(int i = 0; i < sequence.size(); i++) {
        newSequence[i] = sequence[permutation[i]];
    }
    return newSequence;
}

vector<int> permute(vector<int> sequence, vector<int> permutation, long long k) {
    while (k > 0) {
        if (k & 1) {
            sequence = applyPermutation(sequence, permutation);
        }
        permutation = applyPermutation(permutation, permutation);
        k >>= 1;
    }
    return sequence;
}
```

**Nota:** Esta tarea puede resolverse más eficientemente en tiempo lineal construyendo el grafo de permutaciones y considerando cada ciclo independientemente. A continuación, podría calcular $k$ módulo el tamaño del ciclo y encontrar la posición final para cada número que forma parte de este ciclo.

### Aplicación rápida de un conjunto de operaciones geométricas a un conjunto de puntos.

**Problema:** Dados $n$ puntos $p_i$, aplica $m$ transformaciones a cada uno de estos puntos. Cada transformación puede ser un desplazamiento, un escalado o una rotación alrededor de un eje por un ángulo dado. También existe una operación "bucle" que aplica una lista dada de transformaciones $k$ veces (las operaciones "bucle" pueden anidarse). Debes aplicar todas las transformaciones más rápido que $O(n \cdot length)$, donde $length$ es el número total de transformaciones a aplicar (después de completar las operaciones "bucle").

**Solución:** Veamos cómo los diferentes tipos de transformaciones cambian las coordenadas:

* Operación de desplazamiento: añade una constante diferente a cada una de las coordenadas.
* Operación de escalado: multiplica cada una de las coordenadas por una constante diferente.
* Operación de rotación: la transformación es más complicada (no entraremos en detalles aquí), pero cada una de las nuevas coordenadas puede representarse como una combinación lineal de las anteriores.

Como puedes ver, cada una de las transformaciones puede representarse como una operación lineal sobre las coordenadas. Así, una transformación se puede escribir como una matriz $4 \times 4$ de la forma:

$$
\begin{pmatrix}
a_{11} & a_ {12} & a_ {13} & a_ {14} \\
a_{21} & a_ {22} & a_ {23} & a_ {24} \\
a_{31} & a_ {32} & a_ {33} & a_ {34} \\
a_{41} & a_ {42} & a_ {43} & a_ {44}
\end{pmatrix}
$$

que multiplicado por un vector con las coordenadas antiguas y una unidad da un nuevo vector con las nuevas coordenadas y una unidad:

$$
\begin{pmatrix} x & y & z & 1 \end{pmatrix} \cdot
\begin{pmatrix}
a_{11} & a_ {12} & a_ {13} & a_ {14} \\
a_{21} & a_ {22} & a_ {23} & a_ {24} \\
a_{31} & a_ {32} & a_ {33} & a_ {34} \\
a_{41} & a_ {42} & a_ {43} & a_ {44}
\end{pmatrix}
 = \begin{pmatrix} x' & y' & z' & 1 \end{pmatrix}
$$

(¿Por qué introducir una cuarta coordenada ficticia? Esa es la belleza de las [coordenadas homogéneas](https://en.wikipedia.org/wiki/Homogeneous_coordinates), que encuentran gran aplicación en los gráficos por ordenador. Sin esto, no sería posible implementar operaciones afines como la operación de desplazamiento como una simple multiplicación matricial, ya que requiere que _añadamos_ una constante a las coordenadas. La transformación afín se convierte en una transformación lineal en la dimensión superior).

He aquí algunos ejemplos de cómo se representan las transformaciones en forma de matriz:

* Operación de desplazamiento: desplaza la coordenada $x$ en $5$, la coordenada $y$ en $7$ y la coordenada $z$ en $9$

$$
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
5 & 7 & 9 & 1
\end{pmatrix}
$$

* Operación de escalado: escala la coordenada $x$ en $10$ y las otras dos en $5$.

$$
\begin{pmatrix}
10 & 0 & 0 & 0 \\
0 & 5 & 0 & 0 \\
0 & 0 & 5 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

* Operación de rotación: gira $\theta$ grados alrededor del eje $x$ siguiendo la regla de la mano derecha (sentido antihorario).

$$
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & \cos \theta & -\sin \theta & 0 \\
0 & \sin \theta & \cos \theta & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

Ahora, una vez que cada transformación se describe como una matriz, la secuencia de transformaciones puede describirse como un producto de estas matrices, y un "bucle" de $k$ repeticiones puede describirse como la matriz elevada a la potencia de $k$ (que puede calcularse mediante exponenciación binaria en $O(\log{k})$). De este modo, la matriz que representa todas las transformaciones puede calcularse primero en $O(m \log{k})$, y luego puede aplicarse a cada uno de los $n$ puntos en $O(n)$ para una complejidad total de $O(n + m \log{k})$.


### Número de caminos de longitud $k$ en un grafo

**Problema:** Dado un grafo dirigido no ponderado de $n$ vértices, encuentra el número de caminos de longitud $k$ desde cualquier vértice $u$ a cualquier otro vértice $v$.

<!-- TODO fix link [otro artículo](../graph/fixed_length_paths.md). -->
**Solución:** Este problema se considera con más detalle en _**otro articulo.**_ El algoritmo consiste en elevar la matriz de adyacencia $M$ del grafo (una matriz donde $m_{ij} = 1$ si hay una arista de $i$ a $j$, o $0$ en caso contrario) a la $k$-ésima potencia. Ahora $m_{ij}$ será el número de caminos de longitud $k$ de $i$ a $j$. La complejidad temporal de esta solución es $O(n^3 \log k)$.

**Nota:** En ese mismo artículo, se considera otra variación de este problema: cuando las aristas están ponderadas y se requiere encontrar el camino de peso mínimo que contenga exactamente $k$ aristas. Como se muestra en ese artículo, este problema también se resuelve exponenciando la matriz de adyacencia. La matriz tendría el peso de la arista de $i$ a $j$, o $\infty$ si no hay tal arista.
En lugar de la operación habitual de multiplicar dos matrices, se debe utilizar una modificada:
en lugar de multiplicar, se suman ambos valores, y en lugar de una suma, se toma un mínimo.
Es decir: $result_{ij} = \min\limits_{1\ \leq\ k\ \leq\ n}(a_{ik} + b_{kj})$.

### Variación de la exponenciación binaria: multiplicar dos números módulo $m$ 

**Problema:** Multiplicar dos números $a$ y $b$ módulo $m$. $a$ y $b$ caben en los tipos de datos incorporados, pero su producto es demasiado grande para caber en un entero de 64 bits. La idea es calcular $a \cdot b \pmod m$ sin utilizar la aritmética bignum.

**Solución:** Simplemente aplicamos el algoritmo de construcción binaria descrito anteriormente, sólo que realizando sumas en lugar de multiplicaciones. Es decir, hemos "expandido" la multiplicación de dos números a $O (\log m)$ operaciones de suma y multiplicación por dos (que, en esencia, es una suma).

$$
a \cdot b = \begin{cases}
0 &\text{si }a = 0 \\
2 \cdot \frac{a}{2} \cdot b &\text{si }a > 0 \text{ y }a \text{ par} \\
2 \cdot \frac{a-1}{2} \cdot b + b &\text{si }a > 0 \text{ y }a \text{ impar}
\end{cases}
$$


**Nota:** Puedes resolver esta tarea de otra forma utilizando operaciones de coma flotante. Primero calcule la expresión $\frac{a \cdot b}{m}$ usando números de coma flotante y conviértala en un entero sin signo $q$. Reste $q \cdot m$ de $a \cdot b$ utilizando aritmética de enteros sin signo y tómelo modulo $m$ para encontrar la respuesta. Esta solución parece poco fiable, pero es muy rápida y muy fácil de implementar. Véase [aquí](https://cs.stackexchange.com/questions/77016/modular-multiplication) para más información.

## Problemas de Práctica

* [UVa 1230 - MODEX](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=3671)
* [UVa 374 - Big Mod](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=310)
* [UVa 11029 - Leading and Trailing](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1970)
* [Codeforces - Parking Lot](http://codeforces.com/problemset/problem/630/I)
* [leetcode - Count good numbers](https://leetcode.com/problems/count-good-numbers/)
* [Codechef - Chef and Riffles](https://www.codechef.com/JAN221B/problems/RIFFLES)
* [Codeforces - Decoding Genome](https://codeforces.com/contest/222/problem/E)
* [Codeforces - Neural Network Country](https://codeforces.com/contest/852/problem/B)
* [Codeforces - Magic Gems](https://codeforces.com/problemset/problem/1117/D)
* [SPOJ - The last digit](http://www.spoj.com/problems/LASTDIG/)
* [SPOJ - Locker](http://www.spoj.com/problems/LOCKER/)
* [LA - 3722 Jewel-eating Monsters](https://vjudge.net/problem/UVALive-3722)
* [SPOJ - Just add it](http://www.spoj.com/problems/ZSUM/)
* [Codeforces - Stairs and Lines](https://codeforces.com/contest/498/problem/E)

