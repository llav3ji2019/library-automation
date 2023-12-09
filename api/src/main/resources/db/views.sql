-- 1. Создать представление, отображающее все книги и читателей, о которых найдены записи в журнале с заданной даты по заданную дату
create view books_and_clients_in_range as
select b.name, concat(c.last_name, ' ', c.first_name, ' ', c.pather_name) FIO, date_beg
from journal j
         left join books b on b.id = j.book_id
         left join clients c on c.id = j.client_id
where date_beg between '2023-01-05 7:00:00.200' and '2023-02-05 7:00:00.200';

-- 2. Создать представление, отображающее всех читателей и количество книг, находящихся у них на руках
create view amount_of_books_at_home as
select concat(c.last_name, ' ', c.first_name, ' ', c.pather_name) FIO, count(j.book_id) books_at_home
from journal j
         left join clients c on j.client_id = c.id
where j.date_ret is NULL
group by FIO;
