-- Создать хранимую процедуру, выводящую все книги и среднее время, на
-- которое их брали в днях

CREATE OR REPLACE FUNCTION print_avg_time_for_all_books()
    returns table
            (
                book_name varchar(50),
                avg_days  numeric
            )
as $$
select b.name book_name, extract(day from avg(j.date_ret - j.date_beg)) avg_days
from journal j
         left join books b on j.book_id = b.id
group by b.name;
$$
    LANGUAGE sql;


select *
from print_avg_time_for_all_books();



-- Создать хранимую процедуру, имеющую два параметра «книга1» и
-- «книга2». Она должна возвращать клиентов, которые вернули «книгу1»
-- быстрее чем «книгу2». Если какой-либо клиент не брал одну из книг – он не
-- рассматривается.

CREATE OR REPLACE FUNCTION print_clients_with_books(book_name_1 varchar(50), book_name_2 varchar(50))
    returns varchar(150)
as $$
select concat(c.last_name, ' ', c.first_name, ' ', c.pather_name) as FIO
from (select j1.client_id
      from journal j1
               join journal j2 on j1.client_id = j2.client_id and j1.book_id = (select id
                                                                                from books
                                                                                where name = book_name_1) and
                                  j2.book_id = (select id
                                                from books
                                                where name = book_name_2)
      where j1.date_ret is not null
        and (j2.date_ret is null or j2.date_ret > j1.date_ret)) data
         left join clients c on data.client_id = c.id
$$
    LANGUAGE sql;

select *
from print_clients_with_books('Программист-прагматик: ваш путь к мастерству',
                              'Рефакторинг: улучшение дизайна существующего кода');

-- Создать хранимую процедуру с входным параметром «клиент» и выходным
-- параметром – количеством книг, находящихся у него


CREATE OR REPLACE FUNCTION get_book_amount(in f_name varchar(50), in l_name varchar(50), in p_name varchar(50),
                                           out book_amount numeric)
as $$
select count(*)
from journal j
         left join clients c on j.client_id = c.id
where first_name = f_name
  and last_name = l_name
  and pather_name = p_name
  and date_ret is null
$$
    LANGUAGE sql;


select get_book_amount('Кристофер', 'Андерсон', 'Робертович') as book_amount;


-- Создать хранимую процедуру с входным параметром «книга» и двумя
-- выходными параметрами, возвращающими самое большое время на
-- который брали книгу и читателя, поставившего рекорд

CREATE OR REPLACE FUNCTION max_book_day_counter(in book_name varchar(50),
                                                out name varchar(150),
                                                out day_counter integer)
as $$
select concat(c.last_name, ' ', c.first_name, ' ', c.pather_name) as FIO, extract(day from (j.date_ret - j.date_beg)) as days_count
from journal j
         left join clients c on j.client_id = c.id
         left join books b on j.book_id = b.id
where b.name = book_name
  and date_ret is not null
order by days_count desc
limit 1;
$$
    LANGUAGE sql;


select * from max_book_day_counter('Программист-прагматик: ваш путь к мастерству');






-- Количество книг у клиента
CREATE OR REPLACE FUNCTION clientBookCounter(in clientId bigint, out book_amount integer)
as $$
select count(*)
from journal j
         left join clients c2 on j.client_id = c2.id
where j.date_ret is NULL
    and c2.id = clientId;
$$
    LANGUAGE sql;

--     ⦁	Размер штрафа заданного клиента.
CREATE OR REPLACE FUNCTION clientFineCounter(in clientId bigint, out fine integer)
as $$
select sum(EXTRACT(DAY FROM (age(localtimestamp(3), j.date_end))) * (select bt.fine
                                                                     from books b
                                                                              left join book_types bt on b.type_id = bt.id
                                                                     where b.id = j.book_id)) as sum
from journal j
         left join clients c
                   on j.client_id = c.id
where j.date_ret is NULL
  and EXTRACT (DAY FROM (age(localtimestamp(3)
    , j.date_end))) >= 0
  and c.id = clientId;
$$
    LANGUAGE sql;





--     ⦁	Размер самого большого штрафа
CREATE OR REPLACE FUNCTION biggestFineCounter(out fine integer)
as $$
select sum(EXTRACT(DAY FROM (age(localtimestamp(3), j.date_end))) * (select bt.fine
                                                                     from books b
                                                                              left join book_types bt on b.type_id = bt.id
                                                                     where b.id = j.book_id)) as sum
from journal j
where j.date_ret is NULL
  and EXTRACT (DAY FROM (age(localtimestamp(3)
    , j.date_end))) >= 0
group by j.client_id
order by sum desc
limit 1;
$$
    LANGUAGE sql;


--     ⦁	Три самые популярные книги
CREATE OR REPLACE FUNCTION mostPopularBook()
    returns table
            (
                book_name varchar(50),
                book_amount numeric
            )
as $$
select b.name, count(*) as book_counter
from journal j
         left join books b on j.book_id = b.id
group by b.name
order by book_counter DESC, b.name
limit 3;
$$
    LANGUAGE sql;

select book_name from mostPopularBook();
