# Library SOA Project

Este proyecto de biblioteca utiliza la arquitectura orientada a servicios (SOA) para proporcionar una estructura modular, en la cual cada servicio es autónomo y posee su propia base de datos y lógica de negocio. Este proyecto sirve como práctica para implementar SOA con Node.js y Express, explorando las ventajas de escalabilidad, mantenibilidad y separación de responsabilidades en un sistema distribuido.

## Estructura del Proyecto

El proyecto está organizado como un monorepo en el que cada servicio representa un dominio específico del sistema de biblioteca.

### Servicios

#### Servicio de Books
**Rutas:**
- `GET /books`: Obtiene todos los libros.
- `GET /books/:id`: Obtiene un libro por su ID.
- `POST /books`: Crea un nuevo libro.
- `PUT /books/:id`: Actualiza un libro.
- `DELETE /books/:id`: Elimina un libro.
- `GET /books/:id/availability`: Verifica la disponibilidad de un libro.

#### Servicio de Loans
**Rutas:**
- `GET /loans`: Obtiene todos los préstamos.
- `GET /loans/:id`: Obtiene un préstamo por su ID.
- `GET /loans/:user_id/loan-history`: Obtiene el historial de préstamos de un usuario.
- `POST /loans`: Crea un préstamo.
- `PUT /loans/:id`: Actualiza un préstamo.
- `PUT /loans/:id/return`: Marca un préstamo como devuelto.

#### Servicio de Fines
**Rutas:**
- `GET /fines`: Obtiene todas las multas.
- `GET /fines/:id`: Obtiene una multa por su ID.
- `GET /fines/user/:user_id`: Obtiene las multas de un usuario.
- `GET /fines/user/:user_id/summary`: Obtiene el resumen de multas pendientes de un usuario.
- `POST /fines`: Crea una multa.
- `PUT /fines/:id/pay`: Marca una multa como pagada.

#### Servicio de Reservations
**Rutas:**
- `GET /reservations`: Obtiene todas las reservas.
- `GET /reservations/:id`: Obtiene la primera reservación de un libro.
- `POST /reservations`: Crea una reserva.
- `PUT /reservations/:id`: Actualiza una reservación.
- `DELETE /reservations/:id`: Elimina una reservación.

#### Servicio de Users
**Rutas:**
- `GET /users`: Obtiene todos los usuarios.
- `GET /users/:id`: Obtiene un usuario por su ID.
- `POST /users`: Crea un nuevo usuario.
- `PUT /users/:id`: Actualiza un usuario.
- `DELETE /users/:id`: Elimina un usuario.

## Principios de Arquitectura SOA

Cada servicio en esta aplicación:
- Es autónomo y tiene su propia lógica de negocio.
- Se comunica de forma asincrónica con otros servicios cuando es necesario, reduciendo dependencias directas.
- Utiliza su propia base de datos para encapsular completamente los datos y la lógica del servicio en particular.

## Próximos Pasos

1. **Autenticación y Autorización**: Implementar un servicio de autenticación centralizado para gestionar usuarios y accesos de forma segura.
2. **Docker**: Contenerizar cada servicio para facilitar el despliegue y administración del proyecto.

---

Este proyecto es una práctica en la implementación de la arquitectura SOA para entender y explorar sus beneficios en una aplicación real.
