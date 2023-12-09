-- Необходимо реализовать хранимую процедуру, рассчитывающую сумму штрафов,
-- полученную библиотекой за некоторый период времени. Хранимая процедура должна
-- иметь два входных параметра задающие интервал времени и один выходной, в котором
-- возвращать размер штрафа.
-- Предлагаемый алгоритм: создаем курсор, который пробегает по строкам журнала,
-- реальная дата возврата которых попадает в заданный интервал. Для каждой строки
-- рассчитываем размер штрафа и суммируем его в некоторой переменной, значение которой
-- по окончании работы курсора будет выдано в качестве выходного параметр с общей
-- суммой штрафов.

create or replace function calc_fine_sum(in start_date timestamp, in end_date timestamp, out total_fine integer)
as $$
    declare
    summary integer := 0;

    current_fine integer := 0;

    fine_cursor CURSOR for
    select (EXTRACT(DAY FROM (age(j.date_ret, j.date_end))) * (select bt.fine from books b left join book_types bt on b.type_id = bt.id where b.id = j.book_id)) as cur_fine
    from journal j
    WHERE date_ret between start_date and end_date;
begin
        open fine_cursor;

        LOOP
            FETCH fine_cursor INTO current_fine;
            IF NOT FOUND THEN EXIT;END IF;
            if current_fine > 0 then summary := summary + current_fine;
            end if;
        END LOOP;

    CLOSE fine_cursor;

    total_fine := summary;
end
$$
    language 'plpgsql';

select * from calc_fine_sum('2023-01-05 7:00:00.200', '2024-02-05 7:00:00.200');

-- Необходимо реализовать хранимую процедуру, выбирающую три самые
-- популярные книги за некоторый интервал времени. Хранимая процедура должна иметь
-- два входных параметра задающие интервал времени.

-- Предлагаемый алгоритм: Создаем три переменные, хранящие идентификаторы
-- самых популярных книг и 3 переменные, соответственно хранящие число их выдачей.
-- Создаем курсор, который пробегает по всем книгам, реальная дата выдачи которых
-- попадает в заданный интервал. Для каждой книги рассчитываем количество ее выдачей и,
-- в случае, если она была выдана большее число раз, нежели одна из сохраненных в наших
-- переменных, то заменяем ее новой. По окончании работы курсора выбираем
-- идентификаторы самых популярных книг.

create or replace function most_popular_books(in start_date timestamp, in end_date timestamp)
    RETURNS text
    --     returns table
--             (
--                 book_id integer
--             )
    as $$
declare
    first_id integer := 0;
    second_id integer := 0;
    third_id integer := 0;
    first_amount integer := 0;
    second_amount integer := 0;
    third_amount integer := 0;
    tmp1 integer := 0;
    tmp2 integer := 0;

    current_book_id integer := 0;
    current_book_amount integer := 0;

    book_selector CURSOR for
        select b.id, count(*) as book_counter
        from journal j
                 left join books b on j.book_id = b.id
        WHERE date_ret between start_date and end_date
        group by b.id
        order by book_counter DESC, b.id;

begin
    open book_selector;

    LOOP
        FETCH book_selector INTO current_book_id, current_book_amount;
        IF NOT FOUND THEN EXIT;END IF;
        if first_amount < current_book_amount then
            tmp1 := first_amount;
            tmp2 := first_id;
            first_amount := current_book_amount;
            first_id := current_book_id;
            current_book_amount := tmp1;
            current_book_id := tmp2;
        end if;

        if second_amount < current_book_amount then
            tmp1 := second_amount;
            tmp2 := second_id;
            second_amount := current_book_amount;
            second_id := current_book_id;
            current_book_amount := tmp1;
            current_book_id := tmp2;
        end if;

        if third_amount < current_book_amount then
            third_amount := current_book_amount;
            third_id := current_book_id;
        end if;
    END LOOP;
    RETURN(concat(first_id, ' ', second_id, ' ', third_id));

--     --     create table test(
-- --         b_id integer
-- --     );
-- --
-- --     insert into test(b_id) values
-- --                                (first_id),
-- --                                (second_id),
-- --                                (third_id);
-- --
-- -- --     SELECT first_id UNION ALL SELECT second_id UNION ALL SELECT third_id;
-- --     select * from test;
-- --     CLOSE book_selector;
end
$$
    language plpgsql;

select * from most_popular_books('2023-01-05 7:00:00.200', '2024-02-05 7:00:00.200');
