---
tags:
  - cp-algorithms
e_maxx_link: prime_sieve_linear
---

# Criba Lineal

Dado un número $n$, encontrar todos los números primos en un segmento $[2;n]$.

La forma estándar de resolver esta tarea es utilizar [la criba de Eratóstenes](criba_eratosthenes). Este algoritmo es muy sencillo, pero tiene un tiempo de ejecución $O(n \log \log n)$.

Aunque hay muchos algoritmos conocidos con tiempo de ejecución sublineal (es decir, $o(n)$), el algoritmo descrito a continuación es interesante por su simplicidad: no es más complejo que la clásica Criba de Eratóstenes.

Además, el algoritmo dado aquí calcula **factorizaciones de todos los números** en el segmento $[2; n]$ como efecto secundario, y eso puede ser útil en muchas aplicaciones prácticas.

La debilidad del algoritmo dado está en usar más memoria que la clásica criba de Eratóstenes: requiere una matriz de $n$ números, mientras que para la clásica criba de Eratóstenes basta con tener $n$ bits de memoria (que es 32 veces menos).

Así, tiene sentido utilizar el algoritmo descrito sólo hasta para números de orden $10^7$ y no mayores.

El algoritmo se debe a Paul Pritchard. Es una variante del algoritmo 3.3 de (Pritchard, 1987: véanse las referencias al final del artículo).

## Algoritmo

Nuestro objetivo es calcular el **mínimo factor primo** $lp [i]$ para cada número $i$ en el segmento $[2; n]$.

Además, necesitamos almacenar la lista de todos los números primos encontrados - llamémosla $pr []$.

Inicializaremos los valores $lp[i]$ con ceros, lo que significa que asumimos que todos los números son primos. Durante la ejecución del algoritmo este array se irá llenando gradualmente.

Ahora recorreremos los números de 2 a $n$. Tenemos dos casos para el número actual $i$:

- $lp[i] = 0$ - significa que $i$ es primo, es decir, no hemos encontrado ningún factor menor para él.  
  Por lo tanto, asignamos $lp[i] = i$ y añadimos $i$ al final de la lista $pr[]$.

- $lp[i] \neq 0$ - esto significa que $i$ es compuesto, y su factor primo mínimo es $lp[i]$.

En ambos casos actualizamos los valores de $lp[]$ para los números que son divisibles por $i$. Sin embargo, nuestro objetivo es aprender a hacer para establecer un valor $lp []$ a lo sumo una vez para cada número. Podemos hacerlo de la siguiente manera:

Consideremos los números $x_j = i \cdot p_j$, donde $p_j$ son todos los números primos menores o iguales que $lp [i]$ (por eso necesitamos almacenar la lista de todos los números primos).

Estableceremos un nuevo valor $lp[x_j] = p_j$ para todos los números de esta forma.

La prueba de la veracidad de este algoritmo y su tiempo de ejecución se puede encontrar después de la implementación.

## Implementación

```cpp
const int N = 10000000;
vector<int> lp(N+1);
vector<int> pr;
 
for (int i=2; i <= N; ++i) {
	if (lp[i] == 0) {
		lp[i] = i;
		pr.push_back(i);
	}
	for (int j = 0; i * pr[j] <= N; ++j) {
		lp[i * pr[j]] = pr[j];
		if (pr[j] == lp[i]) {
			break;
		}
	}
}
```

## Prueba de veracidad

Tenemos que demostrar que el algoritmo establece todos los valores $lp []$ correctamente, y que cada valor se establecerá exactamente una vez. Por lo tanto, el algoritmo tendrá un tiempo de ejecución lineal, ya que todas las acciones restantes del algoritmo, obviamente, trabajan para $O (n)$.

Nótese que cada número $i$ tiene exactamente una representación en forma:

$$
i = lp [i] \cdot x
$$

donde $lp [i]$ es el mínimo factor primo de $i$, y el número $x$ no tiene ningún factor primo menor que $lp [i]$, es decir.

$$
lp [i] \le lp [x]
$$

Ahora, comparemos esto con las acciones de nuestro algoritmo: de hecho, para cada $x$ pasa por todos los números primos que se podría multiplicar, es decir, todos los números primos hasta $lp [x]$ (incluido), con el fin de obtener los números en la forma dada anteriormente.

Por lo tanto, el algoritmo pasará por cada número compuesto exactamente una vez, estableciendo allí los valores correctos $lp []$. Q.E.D.

## Tiempo de ejecución y memoria

Aunque el tiempo de ejecución de $O(n)$ es mejor que $O(n \log \log n)$ de la clásica criba de Eratóstenes, la diferencia entre ellos no es tan grande.
En la práctica, la criba lineal funciona más o menos tan rápido como una implementación típica de la criba de Eratóstenes.

En comparación con las versiones optimizadas de la criba de Eratóstenes, como la criba segmentada, es mucho más lento.

Teniendo en cuenta los requisitos de memoria de este algoritmo - una matriz $lp []$ de longitud $n$, y una matriz de $pr []$ de longitud $\frac n {\ln n}$, este algoritmo parece ser peor que la clásica criba en todos los sentidos.

Sin embargo, su cualidad redentora es que este algoritmo calcula una matriz $lp []$, que nos permite encontrar la factorización de cualquier número en el segmento $[2; n]$ en el tiempo del orden de tamaño de esta factorización. Además, utilizar sólo un array extra nos permitirá evitar divisiones al buscar la factorización.

Conocer las factorizaciones de todos los números es muy útil para algunas tareas, y este algoritmo es uno de los pocos que permiten encontrarlas en tiempo lineal.

## Referencias

- Paul Pritchard, **Linear Prime-Number Sieves: a Family Tree**, Science of Computer Programming, vol. 9 (1987), pp.17-35.
