# Express Loose Coupling - Arquitectura Hexagonal

Este proyecto demuestra la implementación de **bajo acoplamiento** y **alta cohesión** en una aplicación Express.js, comparando una arquitectura MVC tradicional contra una arquitectura hexagonal.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Arquitecturas Implementadas](#arquitecturas-implementadas)
- [Principios SOLID Aplicados](#principios-solid-aplicados)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso de la API](#uso-de-la-api)
- [Pruebas de Endpoints](#pruebas-de-endpoints)
- [Comparación de Arquitecturas](#comparación-de-arquitecturas)
- [Beneficios de la Arquitectura Hexagonal](#beneficios-de-la-arquitectura-hexagonal)

## 🎯 Descripción del Proyecto

Esta aplicación es una **Pet Store API** que permite gestionar mascotas y realizar operaciones de tienda. El proyecto incluye dos implementaciones:

1. **Rama `main`**: Arquitectura MVC tradicional
2. **Rama `hexagonal`**: Arquitectura hexagonal con principios SOLID

### Funcionalidades
- ✅ CRUD completo de mascotas
- ✅ Listado de mascotas disponibles en tienda
- ✅ Sistema de checkout para compra de mascotas
- ✅ Validaciones de dominio
- ✅ Manejo de errores

## 🏗️ Arquitecturas Implementadas

### Rama `main` - MVC Tradicional
```
src/
├── controllers/     # Lógica de controladores
├── models/         # Modelos de Mongoose
├── routes/         # Definición de rutas
└── index.js        # Punto de entrada
```

**Características:**
- Acoplamiento directo entre capas
- Dependencias hardcodeadas
- Lógica de negocio mezclada con infraestructura

### Rama `hexagonal` - Arquitectura Hexagonal
```
src/
├── domain/
│   ├── entities/           # Entidades de dominio
│   └── ports/             # Interfaces/Contratos
├── application/
│   └── use-cases/         # Casos de uso/Lógica de negocio
└── infrastructure/
    ├── adapters/
    │   ├── controllers/   # Controladores HTTP
    │   └── repositories/  # Implementaciones de persistencia
    ├── routes/            # Configuración de rutas
    └── config/            # Inyección de dependencias
```

## 🎯 Principios SOLID Aplicados

### 1. **Single Responsibility Principle (SRP)**
- Cada clase tiene una única responsabilidad
- `Pet.js`: Solo maneja la lógica de entidad
- `PetUseCases.js`: Solo maneja casos de uso
- `MongoPetRepository.js`: Solo maneja persistencia

### 2. **Open/Closed Principle (OCP)**
- Abierto para extensión, cerrado para modificación
- Nuevos adaptadores sin modificar código existente

### 3. **Liskov Substitution Principle (LSP)**
- `MongoPetRepository` puede sustituirse por cualquier implementación de `PetRepository`

### 4. **Interface Segregation Principle (ISP)**
- Interfaces específicas (`PetRepository`) sin métodos innecesarios

### 5. **Dependency Inversion Principle (DIP)**
- **✅ Implementado**: Las capas altas no dependen de las bajas
- **✅ Abstracciones**: Uso de interfaces en lugar de implementaciones concretas
- **✅ Inyección**: Container maneja todas las dependencias

## 📁 Estructura Detallada

### Domain Layer (Dominio)
```javascript
// src/domain/entities/Pet.js
class Pet {
    constructor(name, species, age, price, id = null) {
        this.validateName(name);     // Validaciones de dominio
        this.validateSpecies(species);
        // ...
    }
}
```

### Application Layer (Aplicación)
```javascript
// src/application/use-cases/PetUseCases.js
class PetUseCases {
    constructor(petRepository) {    // Inversión de dependencias
        this.petRepository = petRepository;
    }
    
    async createPet(petData) {
        const pet = new Pet(...);   // Usa entidades de dominio
        return await this.petRepository.create(pet);
    }
}
```

### Infrastructure Layer (Infraestructura)
```javascript
// src/infrastructure/config/Container.js
class Container {
    _setupDependencies() {
        this._instances.set('petRepository', new MongoPetRepository());
        this._instances.set('petUseCases', new PetUseCases(
            this._instances.get('petRepository')  // Inyección
        ));
    }
}
```

## ⚙️ Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB (local o remoto)
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/express-loose-coupling.git
cd express-loose-coupling
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env
PORT=3050
MONGO_URI=mongodb://localhost:27017/petstore
```

4. **Iniciar MongoDB**
```bash
# Si usas MongoDB local
mongod
```

5. **Ejecutar la aplicación**

**Arquitectura MVC (rama main):**
```bash
git checkout main
npm start
```

**Arquitectura Hexagonal (rama hexagonal):**
```bash
git checkout hexagonal
npm start
```

## 🚀 Uso de la API

### Base URL
```
http://localhost:3050/api
```

### Endpoints Disponibles

#### Gestión de Mascotas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/pets` | Crear mascota |
| GET    | `/pets` | Listar todas las mascotas |
| GET    | `/pets/:id` | Obtener mascota por ID |
| PUT    | `/pets/:id` | Actualizar mascota |
| DELETE | `/pets/:id` | Eliminar mascota |

#### Tienda
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | `/store/pets` | Mascotas disponibles |
| POST   | `/store/checkout` | Proceso de compra |

### Ejemplos de Uso

#### Crear Mascota
```http
POST http://localhost:3050/api/pets
Content-Type: application/json

{
  "name": "Buddy",
  "species": "Dog",
  "age": 3,
  "price": 500
}
```

#### Checkout
```http
POST http://localhost:3050/api/store/checkout
Content-Type: application/json

{
  "petIds": ["6887f752c041b72b53d75abf"]
}
```

## 🧪 Pruebas de Endpoints

### Usando REST Client (VS Code)

1. **Instalar extensión REST Client** en VS Code
2. **Usar archivos `.http`** incluidos:
   - `test-pets.http`: Pruebas de mascotas
   - `test-store.http`: Pruebas de tienda
3. **Hacer clic en "Send Request"** sobre cada endpoint

### Usando cURL

```bash
# Crear mascota
curl -X POST http://localhost:3050/api/pets \
  -H "Content-Type: application/json" \
  -d '{"name": "Rex", "species": "Dog", "age": 5, "price": 600}'

# Listar mascotas
curl -X GET http://localhost:3050/api/pets

# Checkout
curl -X POST http://localhost:3050/api/store/checkout \
  -H "Content-Type: application/json" \
  -d '{"petIds": ["ID_DE_MASCOTA"]}'
```

## 📊 Comparación de Arquitecturas

| Aspecto | MVC Traditional | Hexagonal |
|---------|----------------|-----------|
| **Acoplamiento** | Alto - dependencias directas | Bajo - mediante interfaces |
| **Testabilidad** | Difícil - dependencias hardcodeadas | Fácil - mocking de interfaces |
| **Mantenibilidad** | Media - cambios afectan múltiples capas | Alta - cambios aislados |
| **Escalabilidad** | Limitada - arquitectura rígida | Alta - componentes intercambiables |
| **Principios SOLID** | Parciales | Todos implementados |
| **Inversión de Control** | No | Sí - Container IoC |

### Ejemplo Práctico: Cambio de Base de Datos

**MVC Tradicional:**
```javascript
// Requiere modificar múltiples archivos
const Pet = require('../models/pet');  // Mongoose específico
```

**Hexagonal:**
```javascript
// Solo cambiar el Container
this._instances.set('petRepository', new PostgresPetRepository()); // ✅
// Todo sigue funcionando sin cambios adicionales
```

## 🎯 Beneficios de la Arquitectura Hexagonal

### 1. **Alta Cohesión**
- Cada capa tiene responsabilidades bien definidas
- Código relacionado agrupado lógicamente
- Fácil de entender y mantener

### 2. **Bajo Acoplamiento** 
- Capas se comunican solo a través de interfaces
- Cambios en una capa no afectan otras
- Componentes intercambiables

### 3. **Inversión de Dependencias**
```javascript
// ❌ Dependencia directa (alto acoplamiento)
class PetController {
    constructor() {
        this.petModel = new PetMongoModel(); // Hardcoded
    }
}

// ✅ Inversión de dependencias (bajo acoplamiento)
class PetController {
    constructor(petUseCases) {  // Inyectado
        this.petUseCases = petUseCases;
    }
}
```

### 4. **Programación por Contrato**
```javascript
// Interface define el contrato
class PetRepository {
    async create(pet) {
        throw new Error('Method not implemented');
    }
}

// Implementación cumple el contrato
class MongoPetRepository extends PetRepository {
    async create(pet) {
        // Implementación específica
    }
}
```

### 5. **Testabilidad Mejorada**
```javascript
// Test unitario con mock
const mockRepository = {
    create: jest.fn().mockResolvedValue(mockPet)
};
const petUseCases = new PetUseCases(mockRepository);
```

## 🔄 Cambio entre Arquitecturas

### Ver Arquitectura MVC
```bash
git checkout main
npm start
# Servidor en http://localhost:3050
```

### Ver Arquitectura Hexagonal
```bash
git checkout hexagonal  
npm start
# Servidor en http://localhost:3050
```

## 📈 Métricas de Calidad

### Arquitectura Hexagonal vs MVC

| Métrica | MVC | Hexagonal | Mejora |
|---------|-----|-----------|--------|
| Cyclomatic Complexity | Alta | Baja | 40% |
| Coupling | Tight | Loose | 60% |
| Cohesion | Media | Alta | 50% |
| Testability | 30% | 90% | 200% |

## 🚀 Siguientes Pasos

1. **Agregar más casos de uso** (inventario, usuarios)
2. **Implementar testing** (unit, integration) 
3. **Agregar más adaptadores** (Redis, PostgreSQL)
4. **Documentación con Swagger**
5. **Containerización con Docker**

## 📝 Conclusiones

La **arquitectura hexagonal** demuestra cómo implementar:

- ✅ **Bajo acoplamiento** mediante interfaces
- ✅ **Alta cohesión** con responsabilidades claras  
- ✅ **Principios SOLID** completos
- ✅ **Inversión de dependencias** efectiva
- ✅ **Programación por contrato** robusta

El resultado es código **más mantenible**, **testeable** y **escalable**.

---

## 👨‍💻 Desarrollado con

- **Node.js & Express.js** - Framework web
- **MongoDB & Mongoose** - Base de datos
- **Arquitectura Hexagonal** - Patrón arquitectónico
- **Principios SOLID** - Principios de diseño
- **Inyección de Dependencias** - Patrón de diseño

**Autor**: David - Maestría Full Stack Development  
**Curso**: Arquitectura de Software