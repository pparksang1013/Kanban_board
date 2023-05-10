DELIMITER $$
CREATE PROCEDURE get_id_procedure(user varchar(45))
BEGIN
select *
from board b
where b.b_id in (SELECT u_1.b_id
				FROM user_table u_0
				join board_user u_1
				on u_0.u_id = u_1.u_id
				where u_0.u_id = user);
END$$

DELIMITER $$
CREATE PROCEDURE totalcomplete(b_id int)
BEGIN
select (select count(*) from card c join task t on t.t_id = c.t_id where t.t_name="done" and c.b_id = b_id) / count(*)
from card c
where c.b_id = b_id;
END$$

DELIMITER $$
CREATE PROCEDURE privatecomplete(b_id int, user varchar(45))
BEGIN
select count(*) / (select count(*) from card c join card_partner cp on c.c_id = cp.c_id where cp.u_id = user and c.b_id = b_id)
from card c
join card_partner cp
on c.c_id = cp.c_id
join task t
on t.t_id = c.c_id
where cp.u_id  = user
and t.t_name = "done"
and c.b_id = b_id;
END$$