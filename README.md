# Автоматизация библиотеки
## Описание работы
Автоматизация процесса взятие книги из библиотеки.

### Роли пользователей
1. #### Сотрудник библиотеки 
    Из имеющихся данных выбирает книгу, клиента и текущую дату, в которую была взята книга. 
    
    Когда книга будет возвращена в библиотеку, то сотрудник меняет дату возврата ```date_ret```
    
    Если дата возврата больше, чем дата окончания аренды книги ```date_end```, то начисляется штраф, который узнаём из типа книги
2. #### Админ
    Управляет зарегистрированными пользователями и их персональными данными, а также книгами, находящимися на складе

## API
### End-Points
#### Book
* ```/library/book/all``` - ручка для получения всех книг в библиотеке
* ```/library/book/add``` - ручка по добавлению новой книги на склад
* ```/library/book/update``` - ручка по обновлению существующей книги
* ```/library/book/delete/{id}``` - ручка по удалению ручки с заданным id

#### Client
* ```/library/client/all``` - ручка для получения всех пользователей из базы читателей
* ```/library/client/add``` - ручка по добавлению нового пользователя в базу читателей
* ```/library/client/update``` - ручка по обновлению существующего клиента в базе читателей
* ```/library/client/delete/{id}``` - ручка по удалению клиента с заданным id в базе читателей

#### Book Type
* ```/library/book_type/all``` - ручка для получения всех типов книг в библиотеке
* ```/library/book_type/add``` - ручка по добавлению нового типа книги для библиотеки
* ```/library/book_type/update``` - ручка по обновлению существующего типа книг
* ```/library/book_type/delete/{id}``` - ручка по удалению типа книг с заданным id

#### Journal
* ```/library/journal/all``` - ручка для получения всех книг в библиотеке
* ```/library/journal/add``` - ручка по добавлению новой книги на склад
* ```/library/journal/update``` - ручка по обновлению существующей ручки
* ```/library/journal/delete/{id}``` - ручка по удалению ручки с заданным id
* ```/statistic/book/amount/{clientId}``` - ручка по получению количества книг у заданного клиента
* ```/statistic/fine/biggest``` - ручка по получению самого большого штрафа среди всех пользователей
* ```/statistic/fine/sum/{clientId}``` - ручка по получению общей суммы штрафа у пользователя
* ```/statistic/popular_book/name``` - ручка по получению топ 2 самых популярных книг

### Стек
- Server
  * Java 21
  * Spring (Boot, Data, MVC)
  * JPA
  * Gradle
  * Docker
  * Docker-compose
  * Hibernate ORM
  * SQL
  * PostgreSQL
  * Swagger
  * Lombok
- Web
  * React
  * TypeScript
  * Css
  * HTML

### Схема бд
![library_schema.png](img%2Flibrary_schema.png)

### Описание ролей пользователей
| Логин  | Пароль  | Доступ                                                                        |
|--------|---------|-------------------------------------------------------------------------------|
| admin  | admin   | Ко всем табличкам с правами  на удаление, редактрирование, добавление         |
| oleg   | oleg123 | Только к таблице с журналом с правами на удаление, редактирование, добавление |

### Главная страница приложения
![index-page.png](img%2Findex-page.png)
