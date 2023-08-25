# **Modelo Caja / Propiedad display**  
  
## **Modelo Caja**  
El modelo de cajas o "box model" es seguramente la característica más importante del lenguaje de hojas de estilos CSS, ya que condiciona el diseño de todas las páginas web. El modelo de cajas es el comportamiento de CSS que hace que todos los elementos de las páginas se representen mediante cajas rectangulares. Estas cajas de una página se crean automáticamente cada vez que se inserta una etiqueta HTML, las cajas no son visibles a simple vista porque inicialmente no muestran ningún color de fondo ni ningún borde. Los navegadores crean y colocan las cajas de forma automática, pero CSS permite modificar todas sus características.  

### **Partes de un Modelo Caja:**  
- **Contenido(content):** se trata del contenido HTML del elemento (palabras de un párrafo, una imagen, el texto) de una lista de elementos, etc.  
- **Relleno (padding):** espacio libre opcional existente entre el contenido y el borde.  
- **Borde (border):** línea que encierra completamente el contenido y su relleno.  
- **Imagen de Fondo (background image):** imagen que se muestra por detrás del contenido y el espacio de relleno.  
- **Color de Fondo (background color):** color que se muestra por detrás del contenido y el espacio de relleno.  
- **Margen (margin):** separación opcional existente entre la caja y el resto de cajas adyacentes.  

## **Propiedad Display**  
La propiedad CSS "display" se utiliza para controlar cómo se muestra un elemento HTML en una página web. Esta propiedad define el tipo de caja que un elemento debe generar, lo que a su vez determina cómo se posiciona y cómo interactúa con otros elementos en el diseño de la página.  

### **Valores que puede tener:**  
- **Block:** Este valor hace que el elemento se comporte como un bloque. Ocupará todo el ancho disponible en su contenedor y comenzará en una nueva línea. Los elementos de tipo bloque generalmente admiten propiedades de dimensionamiento, como ancho y alto.  
- **Inline:** Los elementos con esta propiedad se comportan como elementos en línea. Ocuparán solo el espacio necesario para su contenido y no forzarán un salto de línea después de ellos. No pueden establecer dimensiones de ancho o alto.  
- **Inline-Block:** Esta combinación de los dos valores anteriores permite que un elemento se comporte como un elemento en línea, pero aún así tenga propiedades de dimensionamiento, como ancho y alto. Ocupará solo el espacio necesario horizontalmente y permitirá establecer dimensiones.  
- **None:** Al establecer "display" en "none", el elemento se ocultará por completo y no ocupará ningún espacio en el diseño. Es como si el elemento no existiera en la página.  
- **Flex:** Introducido en CSS3, este valor permite crear un contenedor flexible que ajusta automáticamente el tamaño y la disposición de sus elementos hijos. Es especialmente útil para crear diseños responsivos y centrados en la distribución equitativa del espacio disponible.  
- **Grid:** También introducido en CSS3, este valor permite crear un contenedor de cuadrícula que organiza los elementos hijos en filas y columnas, facilitando la creación de diseños complejos y estructurados.  
- **Table, Table-Cell, Table-Row:** Estos valores permiten emular el comportamiento de una tabla HTML mediante elementos no tabulares. Son útiles en casos donde se requiere un diseño tabular, pero se prefiere utilizar una estructura semántica diferente.  