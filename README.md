# 🎮 Juego de Adivinanza de Números

Un juego de adivinanza de números interactivo desarrollado en TypeScript para la línea de comandos.

> 📚 **Proyecto basado en**: [Number Guessing Game - roadmap.sh](https://roadmap.sh/projects/number-guessing-game)

## 🚀 Características

- Juego interactivo de adivinanza de números
- Interfaz de línea de comandos intuitiva
- Sistema de logging con Winston
- Configuración de intentos personalizable
- Manejo robusto de errores
- Emojis y mensajes amigables

## 📦 Instalación

```bash
npm install
```

## 🎯 Uso

### Juego básico (10 intentos por defecto)
```bash
npm start
```

### Con número personalizado de intentos
```bash
npm start -- --attempts 5
```

### Usando el comando directamente
```bash
npx number-guessing-game
npx number-guessing-game --attempts 15
```

## 🎮 Cómo jugar

1. El juego genera un número aleatorio entre 1 y 100
2. Tienes un número limitado de intentos para adivinarlo
3. En cada intento, el juego te dirá si tu número es mayor o menor
4. ¡Gana adivinando el número antes de que se acaben los intentos!

## 🛠️ Desarrollo

### Compilar el proyecto
```bash
npm run build
```

### Ejecutar en modo desarrollo
```bash
npx ts-node src/cli.ts
```

## 📁 Estructura del proyecto

```
number-guessing-game/
├── src/
│   └── cli.ts          # Archivo principal del juego
├── dist/               # Archivos compilados (generado)
├── package.json        # Configuración del proyecto
├── tsconfig.json       # Configuración de TypeScript
└── README.md           # Este archivo
```

## 🔧 Tecnologías utilizadas

- **TypeScript** - Lenguaje de programación
- **Commander.js** - Interfaz de línea de comandos
- **Winston** - Sistema de logging
- **Node.js** - Runtime de JavaScript

## 📝 Logs

El juego genera logs en los siguientes archivos:
- `error.log` - Solo errores
- `combined.log` - Todos los logs

## 🎨 Personalización

Puedes modificar el juego editando `src/cli.ts`:
- Cambiar el rango de números (actualmente 1-100)
- Modificar los mensajes
- Agregar nuevas características

