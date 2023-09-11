CREATE TABLE user
(
    'user_id'        VARCHAR(20)    NOT NULL    COMMENT '아이디', 
    'user_pwd'       VARCHAR(20)    NOT NULL    COMMENT '패스워드', 
    'image'          TEXT           NOT NULL    COMMENT '이미지', 
    'code'           INT            NOT NULL    COMMENT '분류코드', 
    'nickname'       VARCHAR(20)    NOT NULL    COMMENT '닉네임', 
    'e_mail'         VARCHAR(45)    NULL        COMMENT 'email', 
    'register_date'  DATETIME       NOT NULL    COMMENT '생성일자', 
    'phone_number'   VARCHAR(12)    NOT NULL    COMMENT '전화번호', 
    'kakao_id'       TEXT           NOT NULL    COMMENT '카카오 Key'
     PRIMARY KEY (user_id)
);