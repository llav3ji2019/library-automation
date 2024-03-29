-- Создать триггер, который не позволяет добавить читателя с номером
-- паспорта, который уже есть у существующего читателя

create or replace function check_duplicate_passport()
    returns trigger as
$$
begin
    if EXISTS (
        select passport_num
        from clients
        where passport_num = new.passport_num
    ) THEN
        raise exception 'Читатель с таким номером паспорта уже существует.';
    end if;
    return new;
end;
$$
    language plpgsql;

create or replace trigger trg_check_duplicate_passport
    before insert on clients
    for each row
execute function check_duplicate_passport();

create or replace trigger trg_update_check_duplicate_passport
    before update on clients
    for each row
execute function check_duplicate_passport();

-- insert into clients (first_name, last_name, pather_name, passport_seria, passport_num)
-- values ('aaa', 'aaaa', 'aaa', '1234', '123456');

-- Создать триггер, который не позволяет установить реальную дату возврата
-- журнала библиотекаря меньше, чем дата выдачи

create or replace function check_date_return()
    returns trigger as
$$
begin
    if (select journal.date_beg from journal where journal.id = new.id) > new.date_ret THEN
        raise exception 'Date is incorrect.';
    end if;
    return new;
end;
$$
    language plpgsql;

create or replace trigger trg_check_date_return
    before update of date_ret on journal
    for each row
execute procedure check_date_return();

-- update journal
-- set date_ret = '2023-08-01 16:55:50.500'
-- where id = 24;

-- Создать триггер, который при удалении строки журнала в случае, если книга
-- не возвращена - откатывает транзакцию

create or replace function check_book_return()
    returns trigger as
$$
begin
    IF (select j.date_ret from journal j where j.id = old.id) is null then
        raise exception 'Книга не была возвращена. Транзакция отменена.';
    end if;
    return old;
end;
$$
    language plpgsql;


create or replace trigger check_book_return_trigger
    before delete on journal
    for each row
execute function check_book_return();

-- delete from journal where id = 21;

create or replace function check_books_exists()
    returns trigger as
$$
begin
    if EXISTS (
        select *
        from books
        where books.id = new.book_id and books.cnt = 0
    ) THEN
        raise exception 'Таких книг нет на складе.';
    end if;
    return new;
end;
$$
    language plpgsql;

create or replace trigger trg_check_books_exists
    before insert on journal
    for each row
execute function check_books_exists();


create or replace function check_books_amount()
    returns trigger as
$$
begin
    if (
        select count(*)
        from journal
        where journal.client_id = new.client_id and journal.date_ret IS NULL
        group by journal.client_id
    ) >= 10 THEN
        raise exception 'Верните книги прежде чем брать новую.';
    end if;
    return new;
end;
$$
    language plpgsql;

create or replace trigger trg_check_books_amount
    before insert on journal
    for each row
execute function check_books_amount();

-- insert into journal(book_id, client_id, date_beg, date_end)
-- values (14,1, '2023-12-01 13:54:50.570', '2024-02-02 6:00:00.200');
