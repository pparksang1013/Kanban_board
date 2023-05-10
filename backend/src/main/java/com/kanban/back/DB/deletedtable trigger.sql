-- 삭제 데이터 보관 테이블 트리거 
-- Board 
CREATE TABLE deletedBoardTBL (
b_name VARCHAR (100) NOT NULL comment "board 이름",
	b_goal VARCHAR (100) comment "board 목표",
    b_id int NOT NULL AUTO_INCREMENT PRIMARY key comment "board id",
    b_create_date datetime NOT NULL comment "board 생성날짜",
    b_upd_date datetime comment "board 수정일자",
    b_creator VARCHAR (100) NOT NULL comment "board 생성자",
    b_del_yn VARCHAR (100) NOT NULL comment "board 삭제여부",
    b_admin VARCHAR(100) NOT NULL comment "board 관리자",
    deletedDate DATETIME 
    );
    
DELIMITER //
CREATE TRIGGER trg_deletedBoardTBL
AFTER DELETE
ON board
FOR EACH ROW
BEGIN
INSERT INTO deletedBoardTBL
VALUES(OLD.b_name, OLD.b_id, OLD.b_create_date, OLD.b_upd_date, OLD.b_creator, OLD.b_del_yn, OLD.b_admin, now());
END //
DELIMITER ;

-- board_user
CREATE TABLE deletedBoard_userTBL(
b_id int NOT NULL comment "board ID",
    constraint foreign key (b_id) references board (b_id),
    u_id VARCHAR (100) NOT NULL comment "사용자 ID",
    constraint foreign key (u_id) references user_table(u_id),
    board_user_id int NOT NULL AUTO_INCREMENT primary key,
    deletedDate DATETIME 
    );
    
DELIMITER //
CREATE TRIGGER trg_deletedBoard_userTBL
AFTER DELETE
ON card
FOR EACH ROW
BEGIN
INSERT INTO deletedBoard_userTBL
VALUES(OLD.b_id, OLD.u_id, OLD.board_user_id, now());
END //
DELIMITER ;

-- card
CREATE TABLE deletedCardTBL(
c_title VARCHAR(100) NOT NULL comment "card 제목",
    b_admin VARCHAR(100) comment "board 관리자",
    c_position int NOT NULL comment "card 순서",
    c_create_date datetime NOT NULL comment "card 생성닐찌",
    c_creator VARCHAR(100) NOT NULL comment "card 생성자",
    c_id int NOT NULL AUTO_INCREMENT primary key comment "card ID" ,
    t_id int NOT NULL comment "task ID",
    constraint foreign key (t_id) references task(t_id),
    b_id int NOT NULL comment "board ID",
    constraint foreign key (b_id) references board(b_id),
    c_upd_p VARCHAR(100) comment "card 수정자",
    c_del_p VARCHAR(100) comment "card 삭제자",
    c_upd_date datetime comment "card 수정날짜",
    c_description TEXT comment "card 설명",
    c_del_yn VARCHAR(100) NOT NULL comment "card 삭제여부",
    deletedDate DATETIME
    );
    
DELIMITER //
CREATE TRIGGER trg_deletedCardTBL
AFTER DELETE
ON card
FOR EACH ROW
BEGIN
INSERT INTO deletedCardTBL
VALUES(OLD.b_admin, OLD.c_position, OLD.c_create_date, OLD.c_creator, OLD.c_id, OLD.t_id, OLD.b_id, OLD.c_upd_p, OLD.c_del_p, OLD.c_upd_date, OLD.c_description,OLD.c_del_yn, now());
END //
DELIMITER ;

-- card partner
CREATE TABLE deletedCard_partnerTBL(
b_id int NOT NULL comment "board ID",
    constraint foreign key (b_id) references board(b_id),
    c_id int NOT NULL comment "card ID",
    constraint foreign key (c_id) references card(c_id),
    u_id VARCHAR (100) NOT NULL comment "사용자 ID" ,
    constraint foreign key (u_id) references user_table (u_id),
    partner_id int NOT NULL AUTO_INCREMENT primary key,
    deletedDate DATETIME
    );
    
DELIMITER //
CREATE TRIGGER trg_deletedCard_partnerTBL
AFTER DELETE
ON card_partner
FOR EACH ROW
BEGIN
INSERT INTO deletedCard_partnerTBL
VALUES(OLD.b_id, OLD.c_id, OLD.u_id,OLD.partner_id, now());
END //
DELIMITER ;
    
-- comment
CREATE TABLE deletedCommentTBL(
    c_id int NOT NULL comment "card ID",
    constraint foreign key (c_id) references card (c_id),
    u_id VARCHAR (100) NOT NULL comment "사용자 ID" ,
    constraint foreign key (u_id) references user_table (u_id),
    del_yn VARCHAR (100) NOT NULL comment "삭제여부",
    comment_id int NOT NULL AUTO_INCREMENT primary key comment "댓글 ID", 
    comment_date datetime  NOT NULL comment "댓글 생성날짜",
    comment_contents TEXT NOT NULL comment "댓글 내용",
    deletedDate DATETIME
    );
    
DELIMITER //
CREATE TRIGGER trg_deletedCommentTBL
AFTER DELETE
ON comment
FOR EACH ROW
BEGIN
INSERT INTO deletedCommentTBL
VALUES(OLD.c_id, OLD.u_id, OLD.dely_yn,OLD.comment_id,OLD.comment_date,OLD.comment_contents, now());
END //
DELIMITER ;

-- tag
CREATE TABLE deletedTagTBL(
 c_id int NOT NULL comment "card ID",
    constraint foreign key (c_id) references card (c_id),
    tag_id int NOT NULL AUTO_INCREMENT primary Key comment "tag ID",
    tag_name VARCHAR(100) NOT NULL comment "tag 이름",
    tag_color int  NOT NULL comment "tag 색상",
    deletedDate DATETIME
    );
    
DELIMITER //
CREATE TRIGGER trg_deletedTagTBL
AFTER DELETE
ON tag
FOR EACH ROW
BEGIN
INSERT INTO deletedTagTBL
VALUES(OLD.c_id, OLD.tag_id, OLD.tag_name,OLD.tag_color, now());
END //
DELIMITER ;


-- task
CREATE TABLE deletedTaskTBL(
t_name VARCHAR (100) NOT NULL comment "task 이름",
    t_create_date datetime  NOT NULL comment "task 생성날짜",
    t_type VARCHAR (100) NOT NULL comment "task 종류",
    t_upd_date datetime  comment "task 수정날짜",
    t_creator VARCHAR (100) NOT NULL comment "task 생성자",
    t_upd_p VARCHAR (100) comment "task 수정자",
    t_del_p VARCHAR (100) comment "task 삭제자",
    t_id int NOT NULL AUTO_INCREMENT Primary Key comment "task ID",
    b_id int NOT NULL comment "board ID",
    constraint foreign Key (b_id) references board(b_id),
    t_del_yn VARCHAR (100) NOT NULL comment "삭제 여부",
    t_position int (100) NOT NULL comment "task 순서",
    deletedDate DATETIME
    );


DELIMITER //
CREATE TRIGGER trg_deletedTaskTBL
AFTER DELETE
ON task
FOR EACH ROW
BEGIN
INSERT INTO deletedTaskTBL
VALUES(OLD.t_name, OLD.t_create_date, OLD.t_type, OLD.t_upd_date, OLD.t_creator, OLD.t_upd_p, OLD.t_del_p, OLD.t_id, OLD.b_id, OLD.t_del_yn, OLD.t_position, now());
END //
DELIMITER ; 

-- tmp_table
CREATE TABLE deletedTmp_tableTBL(
tmp_id int 	NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT "tmp_table ID",
	c_id int NOT NULL comment "card ID",
    constraint foreign key (c_id) references card(c_id),
    u_id VARCHAR (100) NOT NULL comment "사용자 ID" ,
    constraint foreign key (u_id) references user_table (u_id),
    commit_status VARCHAR (100) NOT NULL comment "완료상태",
    deletedDate DATETIME
    );
    
DELIMITER //
CREATE TRIGGER trg_deletedTmp_tableTBL
AFTER DELETE
ON tmp_table
FOR EACH ROW
BEGIN
INSERT INTO deletedTmp_tableTBL
VALUES(OLD.tmp_id, OLD.c_id, OLD.u_id, OLD.commit_status, now());
END //
DELIMITER ; 

-- user_table
CREATE TABLE deletedUser_tableTBL(
u_date_join datetime NOT NULL comment "가입 날짜",
    u_name VARCHAR (100) NOT NULL comment "사용자 이름",
    u_email VARCHAR (100) NOT NULL comment "사용자 이메일",
    u_id VARCHAR (100) NOT NULL primary key  comment "사용자 ID",
    deletedDate DATETIME
    );


DELIMITER //
CREATE TRIGGER trg_deletedUser_tableTBL
AFTER DELETE
ON user_table
FOR EACH ROW
BEGIN
INSERT INTO deletedUser_tableTBL
VALUES(OLD.u_date_join, OLD.u_name, OLD.u_email, OLD.u_id, now());
END //
DELIMITER ; 
    

    

    
    


    



