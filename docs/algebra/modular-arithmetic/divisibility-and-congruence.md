--
tags:
  - author:karelantonio
  - divisibility
--
# Divisibilidad y Congruencias

Cuando estamos restringidos a trabajar en el conjunto de números enteros ($ \mathbb Z $) es necesario crear varios conceptos que permitan trabajar con ellos mas fácilmente. De estos conceptos, es esencial entender la divisibilidad.

Definición 1: Decimos que un número es divisible por otro cuando al realizar el procedimiento habitual de división el resto o residuo es 0 (se retomará esto mas tarde), tambien podemos decir que un número es multiplo o factor de otro.

Sea $a,b$ números enteros, la expresión $$a | b$$ se lee: $a$ divide a $b$, y es posible si y solo si existe otro entero $k$ tal que el número $b$ se puede escribir en funcion de $a$ como $$a\cdot k=b$$ Decimos que un número no divide a otro cuando no existe tal $k$: $$a \not | \space\space b$$

## Propiedades de la divisibilidad

* Todos los números son divisibles por la unidad y por sí mismos, cuando estos son sus únicos divisores se dice que es primo el número: $1 | b, \space b|b$

* $a|b$ si y solo si $b/a \in \mathbb Z$

* Un numero $a$ divide a $b$ si el valor absoluto de el primero divide al valor absoluto del segundo:

$$
|a| \space \space | \space \space |b| 
$$

* Dados tres numeros, $a,b,c$ tal que:

$$
a|b, \space \space b|c \rightarrow a|c
$$

* Si $a|b$ entonces para cualquier $k$ se cumple: $a|(b\cdot k)$

* Decimos que dos números son *coprimos* cuando no existe ningún número distinto de $1$ que divida a ambos osea su máximo común divisor es 1 ($mcd(x,y)=1$). Entonces utilizando esta premisa, sean $a,b,c$ tres números enteros, y:
$$ a | (b \cdot c), \space mcd(a,b)=1 \rightarrow a | c $$

* $a|b$ y $b|a$ si y solo si $|a| = |b|$

* Si $a|b$ y $b\not=0$ entonces $|a| \le |b|$

* Si $a|b$ y $a|c$ entonces para cualesquiera que sean $s$ y $r$ (enteros claro) se cumple: $a | (sb + rc)$

* Si $a|(b+c)$ y $a|b$ entonces $a|c$

## Residuos

Definicion 2: Sean $a,m$ números enteros y para algún $0 \le r < |m|$ (entero no negativo) se cumple que $m | a-r$ entonces $r$ es el *resto de $a$ módulo $m$*, o el resto de dividir $a$ entre $m$, y se escribe: $a \mod m = r$

Definición 3: Sean $a,b,m$ números enteros y $m$ positivo, decimos que $a$ es congruente con $b$ módulo $m$ si $m | (a-b)$ y se escribe: $a \equiv b \space \pmod m$ o tambie: $a \equiv_m b$ Tambien se puede argumentar porque $a$ y $b$ tienen el mismo residuo módulo $m$.

Por ejemplo, el resto de dividir $3$ entre $2$ es $1$, porque $2 | 3-1$, de igual forma, el resto de dividir $5$ entre $2$ es $1$, porque $2 | 5-1$

De ahí podemos decir que $3$ es congruente con $5$ módulo $2$: $$3 \equiv 5 \space \pmod 2$$ porque tienen el mismo residuo, asi que $2|(5-3)$

## Propiedades de los residuos

* $a+b \mod m = (a \mod m) + (b \mod m) \mod m$
* $a\times b \mod m = (a \mod m) \times (b \mod m) \mod m$
* $-a \mod m = m-a \mod m$
* $m \mod m = 0$
* $\frac {a} {b} \mod m$ = $a \times b^{-1}\mod m$ (Ver la sección de inverso modular)

## Clases de números

Con los conceptos de arriba podemos llegar un poco mas lejos. Trabajando módulo $m$, todos los números enteros pueden ser clasificados por sus residuos, de ahi que se pueda expresar el conjunto de todas esas clases como: $\mathbb Z / m \mathbb Z = \{ [0]_m , [1]_m, ..., [m-1]_m \}$ donde $[x]_m$ representa el residuo de un número módulo $m$.

Por ejemplo, para el modulo $10$, su clase de equivalencia es: $\mathbb Z / 10 \mathbb Z = \{[0]_{10}, [1]_{10}, [2]_{10}, [3]_{10},..., [9]_{10} \}$

En la clase $[0]_{10}$ se encuentran todos los numeros divisibles por $10$, por ejemplo $[10]_{10}, [20]_{10}, [200]_{10}$

## Propiedades de las ecuaciones de congruencias

* En las clases de equivalencias, cualquier número es congruente con $0$ módulo el mismo: $$ m \equiv_m 0$$

* Reflexiva: $$a \equiv_m a$$

* Simétrica: $$a\equiv_m b$$ $$ b\equiv_m a$$

* Transitiva: $$a \equiv_m b$$ $$b \equiv_m c$$

Entonces: $$a \equiv_m c$$

* Sean las dos congruencias: $$a \equiv_m b$$ $$x \equiv _m y$$ Entonces: $$ a+x \equiv_m b+y$$ $$ a\cdot x \equiv_m b\cdot y$$

* Para todo $a$ congruente con $b$: $$ a \equiv_m (a \bmod m) \equiv_m b $$

Todas estas propiedades nos permite trabajar con las congruencias *casi* como igualdades

## Ejemplos

La aritmética modular no solo sirve para analizar divisibilidad, tambien para analizar procesos cíclicos.

### 1. ¿Que hora será dentro de $50$ horas, suponiendo que es actualmente las $13$ horas ($1$ de la tarde)?

Solucion: Como las horas se repiten de $24$ en $24$, nos sugiere que podemos utilizar aritmetica modular para resolverlo.

Digamos que el transcurso del tiempo se puede describir con la siguiente ecuación: $24\cdot d + h = t$, Donde $d$ es los días y $t$ es la fecha y hora actual, trabajando un poco con lo que vimos arriba:

$$ 24\cdot d = t-d$$
$$ t \equiv_{24} d $$
Ahora le sumamos $50$ en ambos lados (que es lo que nos piden) y sea $f$ la hora final:
$$ f \equiv_{24} t+50 \equiv_{24} \equiv 13+50$$
$$ f \equiv_{24} 63 \equiv (63\bmod 24)$$
$$ f \equiv_{24}5 $$

Asi que la respuesta sería: dentro de 50 horas, serán las 5 AM.

### 2. ¿Existe algún $x$ tal que $x^2-14$ sea divisible por 3?

Solución: Extraemos de ahi la ecuacion de congruencias:
$$ x^2 \equiv _3 14 $$
$$ x^2 \equiv _3 2 $$
Probamos todas los posibles valores de $x$:
$$ 0^2 \equiv 0 \not \equiv 2 $$
$$ 1^2 \equiv 1 \not \equiv 2 $$
$$ 2^2 \equiv 4 \equiv 1 \not \equiv 2 $$

Por lo tanto, no existe ningún valor que cumpla el criterio.

### 3. Dígito más a la derecha de calcular: $123\times 4567$

Solución:

$$ s \equiv 123 \times 4567 \pmod {10}$$
$$ s \equiv (123 \bmod 10) \times (4567 \bmod 10) \equiv 3\times 7 \equiv 21 \equiv 1 \pmod {10} $$

El dígito de las unidades es $1$